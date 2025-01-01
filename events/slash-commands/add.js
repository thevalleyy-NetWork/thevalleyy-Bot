import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.add;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const num1 = +interaction.options.get("number1").value;
    const num2 = +interaction.options.get("number2").value;

    if (Number.isNaN(num1 + num2)) {
        interaction.reply(l10n.nan[locale]);
    } else {
        interaction.reply(l10n.sum[locale].replace("{sum}", num1 + num2));
    }
};
