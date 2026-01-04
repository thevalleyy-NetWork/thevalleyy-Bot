import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.games;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;
    interaction.reply({ content: l10n.soon[locale], ephemeral: true });
};
