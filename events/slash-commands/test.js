import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.test;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply("test");
    // const members = message.guild.members.cache
    // members.forEach(async member => {
    //     await db(`INSERT INTO discord (dcid, dctag, joindate, oldestjoindate) VALUES (${member.id}, '${await encodeURI(member.user.tag.replaceAll("'", " "))}', ${Date.now()}, ${Date.now()})`)
    //     console.log(`Registering: ${member.user.tag}`)
    // });
};
