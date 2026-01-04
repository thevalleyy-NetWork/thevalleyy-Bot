import { ButtonBuilder, ActionRowBuilder, EmbedBuilder } from "discord.js";
import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.interactionCreate.requestLyrics;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "SPOTIFY_lyrics") return;

    const locale = interaction.locale == "de" ? "de" : "en";
    const iconurl = interaction.guild.iconURL();
    const message = interaction.message;
    const args = message.embeds[0].fields[0].value;

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(message.components[0].components[0].data.custom_id)
            .setLabel(message.components[0].components[0].data.label)
            .setStyle(message.components[0].components[0].data.style)
            .setDisabled(true)
    );

    await message.edit({ embeds: [message.embeds[0]], components: [row] });

    try {
        const waitEmbed = new EmbedBuilder().setColor(config.colors.info).setDescription(l10n.searching[locale].replace("{song}", args));
        await interaction.reply({ embeds: [waitEmbed] });

        const { title, author, lyrics, thumbnail, links, error } = await fetch(`https://some-random-api.com/lyrics?title=${encodeURIComponent(args)}`).then(
            (response) => response.json()
        );

        if (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.colors.error)
                .setTitle(l10n.error[locale])
                .setDescription("`" + error + "`")
                .setFooter({ text: interaction.guild.name, iconURL: iconurl })
                .setTimestamp();
            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

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
            client.error(err, "lyrics.js (button)");
        });
    } catch (err) {
        client.error(err, "lyrics.js (button)");
    }
};
