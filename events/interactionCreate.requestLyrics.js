import { ButtonBuilder, ActionRowBuilder, EmbedBuilder } from "discord.js";
import config from "../config.json" with { type: "json" };

export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "SPOTIFY_lyrics") return;

    const iconurl = interaction.guild.iconURL();
    const message = interaction.message;
    const args = message.embeds[0].fields[0].value;
    const fetch = (await import("node-fetch")).default;

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(message.components[0].components[0].data.custom_id)
            .setLabel(message.components[0].components[0].data.label)
            .setStyle(message.components[0].components[0].data.style)
            .setDisabled(true)
    );

    await message.edit({ embeds: [message.embeds[0]], components: [row] });

    try {
        const waitEmbed = new EmbedBuilder().setColor(config.colors.info).setDescription("Suche nach: `" + args + "`...");
        await interaction.reply({ embeds: [waitEmbed] });

        const { title, author, lyrics, thumbnail, links, error } = await fetch(
            `https://some-random-api.ml/lyrics?title=${args.replaceAll("ä", "ae").replaceAll("ü", "ue").replaceAll("ö", "oe").replaceAll("ß", "ss")}`
        ).then((response) => response.json());

        if (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.colors.errror)
                .setTitle("Es gab einen Fehler...")
                .setDescription("`" + error + "`")
                .setFooter({ text: interaction.guild.name, iconURL: iconurl })
                .setTimestamp();
            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }
        // TODO: test if this still works
        const songEmbed = new EmbedBuilder()
            .setAuthor({
                name: `${author} (${title})`,
                iconURL: interaction.user.avatarURL(),
                url: links.genius,
            })
            .setThumbnail(thumbnail.genius)
            .setDescription(lyrics.substring(0, 4096))
            .setColor(config.colors.info)
            .setFooter({
                text: interaction.guild.name,
                iconURL: iconurl,
            })
            .setTimestamp();
        await interaction.editReply({ embeds: [songEmbed] }).catch(async (err) => {
            await interaction.editReply("Fehler: `" + err + "`");
        });
    } catch (err) {
        await interaction.editReply("Fehler: `" + err + "`");
    }
};
