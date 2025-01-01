import { EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.tp;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const embed = new EmbedBuilder()
        .setTitle(l10n.title[locale])
        .addFields([
            {
                name: l10n.caution[locale],
                value: `**${l10n.notUpToDate[locale]}**`,
            },
            {
                name: `${l10n.version[locale]}`,	
                value: l10n.versionString[locale],
            },
            {
                name: `${l10n.download[locale]}:`,
                value: "[Google-Drive](https://drive.google.com/file/d/1qmDFRpdOqF4HecllwdYI2kWZ--1FU46w/view?usp=sharing)",
            },
        ])
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        })
        .setTimestamp()
        .setColor(config.colors.default);
    interaction.reply({ embeds: [embed] });
};
