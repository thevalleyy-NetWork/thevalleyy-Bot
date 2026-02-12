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
            .setDescription(l10n.searching[locale].replace("{song}", interaction.options.getString("song").substring(0, 150)));

        await interaction.reply({ embeds: [waitEmbed] });
        const response = await fetch(
            `https://some-random-api.com/lyrics?title=${encodeURIComponent(interaction.options.getString("song"))}&key=${config.keys.sra}`,
        );
        const data = await response.json();

        if (data.error) {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.colors.error)
                .setTitle(l10n.error[locale])
                .setDescription("`" + data.error + "`")
                .setFooter({ text: interaction.guild.name, iconURL: iconurl })
                .setTimestamp();
            interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

        const songEmbed = new EmbedBuilder()
            .setAuthor({
                name: `${data.title} (${data.artist})`,
                url: data.url,
            })
            .setDescription(data.lyrics.substring(0, 4096))
            .setColor(config.colors.info)
            .setFooter({
                text: interaction.guild.name,
                iconURL: iconurl,
            })
            .setTimestamp();

        if (data.thumbnail) songEmbed.setThumbnail(data.thumbnail);

        await interaction.editReply({ embeds: [songEmbed] }).catch((err) => {
            client.error(err, "lyrics.js");
        });
    } catch (err) {
        client.error(err, "lyrics.js");
    }
};
