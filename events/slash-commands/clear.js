import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.clear;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    let number = interaction.options.getNumber("number");
    if (number > 100 || number < 1) {
        interaction.reply({
            content: l10n.wrongAmount[locale],
            ephemeral: true,
        });
        return;
    }

    try {
        await interaction.channel.bulkDelete(number);
        client.modLog(l10n.modLog[number == 1 ? "singular" : "plural"][locale].replace("{user}", interaction.user.tag).replace("{amount}", number).replace("{channel}", interaction.channel.name), "clear.js");
        interaction.reply({content: l10n.done[number == 1 ? "singular" : "plural"][locale].replace("{amount}", number), ephemeral: true});
    } catch (error) {
        client.error(error, "clear.js");
        interaction.reply(l10n.error[number == 1 ? "singular" : "plural"][locale]);
    }
};
