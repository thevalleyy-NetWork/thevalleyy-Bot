import { EmbedBuilder } from "discord.js";
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.lyrics;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const iconurl = interaction.guild.iconURL();

    try {
        const waitEmbed = new EmbedBuilder()
            .setColor(config.colors.info)
            .setDescription(l10n.searching[locale].replace("{song}", interaction.options.getString("song").substring(0, 150)))

        interaction.reply({ embeds: [waitEmbed] });
        const { title, author, lyrics, thumbnail, links, error } = await fetch(
            `https://some-random-api.com/lyrics?title=${encodeURIComponent(interaction.options
                .getString("song"))}`
        ).then((response) => response.json());

        if (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.colors.error)
                .setTitle(l10n.error[locale])
                .setDescription("`" + error + "`")
                .setFooter({ text: interaction.guild.name, iconURL: iconurl })
                .setTimestamp();
            interaction.editReply({ embeds: [errorEmbed] });
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

        await interaction.editReply({ embeds: [songEmbed] }).catch((err) => {
            client.error(err, "lyrics.js");
        });
    } catch (err) {
        client.error(err, "lyrics.js");
    }
};
