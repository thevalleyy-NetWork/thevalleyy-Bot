import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.serverlist;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    var text = "```json\n{\n";
    client.guilds.cache.forEach((guild) => {
        text += `    "${guild.name} (${guild.id})": "${guild.memberCount}",\n`;
    });

    text += "}```";
    interaction.reply({ content: text.substring(0, 2000), ephemeral: true });
};
