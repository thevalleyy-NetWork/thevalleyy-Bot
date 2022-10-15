const Discord = require("discord.js");
const config = require("../../config.json");
const mysql = require("mysql2");
const util = require("util");

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});

var db = util.promisify(connection.query).bind(connection);

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply("test");

    // client.error("this is a custom error", "test.js");
    // client.modLog("this is a custom modlog", "test.js");
    // client.log("this is a custom log", "test.js");

    // TODO: Bei jedem client.error auch die interaction replien
    // const members = message.guild.members.cache
    // members.forEach(async member => {
    //     await db(`INSERT INTO discord (dcid, dctag, joindate, oldestjoindate) VALUES (${member.id}, '${await encodeURI(member.user.tag.replaceAll("'", " "))}', ${Date.now()}, ${Date.now()})`)
    //     console.log(`Registering: ${member.user.tag}`)
    // });
};
