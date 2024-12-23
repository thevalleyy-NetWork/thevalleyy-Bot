const Discord = require("discord.js");
const config = require("../../config.json");

export default (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.id == config.owner) return interaction.reply("You do not have permission to use this command.");

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
