const Discord = require("discord.js");
const config = require("../../config.json");
const mysql = require("mysql2");
const util = require("util");
const fs = require("node:fs");

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});

const db = util.promisify(connection.query).bind(connection);

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const user = interaction.options.get("user");

    if (!user) {
        try {
            const res = await db(
                `SELECT dcid FROM discord WHERE blacklisted = 1`
            );
            if (res.length == 0) {
                interaction.reply("Es sind keine Nutzer auf der Blacklist.");
                return;
            }
            const embed = new Discord.EmbedBuilder()
                .setTitle("Blacklist")
                .setDescription(
                    res.map((r) => `<@${r.dcid}>, \`${r.dcid}\``).join("\n")
                )
                .setColor(config.standard_color)
                .setTimestamp()
                .setFooter({
                    text: interaction.guild
                        ? interaction.guild.name
                        : interaction.user.tag,
                    iconURL: interaction.guild
                        ? interaction.guild.iconURL()
                        : interaction.user.avatarURL(),
                });
            interaction.reply({ embeds: [embed] });
        } catch (err) {
            interaction.reply("Es ist ein Fehler aufgetreten: \n" + err);
            client.error(err, "blacklist.js");
        }
        return;
    }

    try {
        const res = await db(
            `SELECT dcid, blacklisted FROM discord WHERE dcid = ${user.user.id}`
        );
        if (res[0]) {
            if (res[0].blacklisted === 1) {
                try {
                    await db(
                        `UPDATE discord SET blacklisted = 0 WHERE dcid = ${user.user.id}`
                    );
                } catch (err) {
                    client.error(err, "blacklist.js");
                    interaction.reply(
                        "Es gab einen Fehler:\n" +
                            err.toString().substring(0, 500)
                    );
                    return;
                }
                client.modLog(
                    `${user.user.tag} wurde von ${interaction.user.tag} von der Blacklist entfernt.`,
                    "blacklist.js"
                );
                interaction.reply(
                    `\`${user.user.tag}\` wurde von der Blacklist entfernt.`
                );
            } else {
                try {
                    await db(
                        `UPDATE discord SET blacklisted = 1 WHERE dcid = ${user.user.id}`
                    );
                } catch (err) {
                    client.error(err, "blacklist.js");
                    interaction.reply(
                        "Es gab einen Fehler:\n" +
                            err.toString().substring(0, 500)
                    );
                    return;
                }
                client.modLog(
                    `${user.user.tag} wurde von ${interaction.user.tag} zu der Blacklist hinzugefügt.`,
                    "blacklist.js"
                );
                interaction.reply(
                    `\`${user.user.tag}\` wurde zur Blacklist hinzugefügt.`
                );
            }
        } else {
            interaction.reply(
                `\`${user.user.tag}\` konnte nicht in der Datenbank gefunden werden.`
            );
        }

        try {
            await db("SELECT * FROM discord").then(async (res) => {
                const dbJson = {
                    date: Date.now(),
                    db: res,
                };
                await fs.writeFileSync(
                    "./data/database.json",
                    JSON.stringify(dbJson, null, 4)
                );
                client.db = await res;

                const blacklist = await res
                    .filter((x) => x.blacklisted == 1)
                    .map((x) => x.dcid);
                client.blacklist = blacklist;

                await fs.writeFileSync(
                    "./data/blacklist.json",
                    JSON.stringify(client.blacklist, null, 4)
                );
            });
        } catch (e) {
            client.error(
                "Retrieved error while caching db, using local copy\n" + e,
                "ready.startup.js"
            );
            // use old database
            client.db = require("./data/database.json").db;
            client.blacklist = require("./data/blacklist.json");
        }
    } catch (err) {
        client.error(err, "blacklist.js");
        interaction.reply("Es gab einen Fehler");
        return;
    }
};
