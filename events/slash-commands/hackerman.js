import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.hackerman

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const hackertext = interaction.options
        .getString("text")
        .replaceAll("A", "4")
        .replaceAll("a", "@")
        .replaceAll("B", "8")
        .replaceAll("b", "6")
        .replaceAll("C", "[")
        .replaceAll("E", "e")
        .replaceAll("g", "9")
        .replaceAll("I", "|")
        .replaceAll("J", "]")
        .replaceAll("l", "1")
        .replaceAll("O", "0")
        .replaceAll("S", "$")
        .replaceAll("s", "5")
        .replaceAll("T", "7")
        .replaceAll("t", "+")
        .replaceAll("Z", "2")
        .substring(0, 2000);

    interaction.reply({ content: l10n.done[locale], ephemeral: true });
    interaction.channel.send({
        content: `\`${hackertext}\``,
        allowedMentions: { parse: [] },
    });
};
