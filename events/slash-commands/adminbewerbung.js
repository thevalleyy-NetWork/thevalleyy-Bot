import { EmbedBuilder } from "discord.js"
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.adminbewerbung

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const embed = new EmbedBuilder()
        .setTitle(l10n.embed.title[locale])
        .setColor(config.colors.default)

    embed.setDescription(l10n.embed.description[locale].replace("{link}", config.links.adminbewerbung));

    interaction.reply({ embeds: [embed] });
};
