const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply("test");

    // TODO: test database

    // client.error("this is a custom error", "test.js");
    // client.modLog("this is a custom modlog", "test.js");
    // client.log("this is a custom log", "test.js");

    // const members = message.guild.members.cache
    // members.forEach(async member => {
    //     await db(`INSERT INTO discord (dcid, dctag, joindate, oldestjoindate) VALUES (${member.id}, '${await encodeURI(member.user.tag.replaceAll("'", " "))}', ${Date.now()}, ${Date.now()})`)
    //     console.log(`Registering: ${member.user.tag}`)
    // });
};
