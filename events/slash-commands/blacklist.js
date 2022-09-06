const Discord = require('discord.js');
const config = require('../../config.json');
const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     
    if (interaction.user.id != config.owner) {
        interaction.reply({content: 'Du hast keine Berechtigung, diesen Befehl auszuführen.', ephemeral: true})
        return;
    }

    const user = interaction.options.get('user');

    if (!user) {
        try {
            const res = await db(`SELECT dcid FROM discord WHERE blacklisted = 1`)
            if (res.length == 0) {
                interaction.reply("Es sind keine Nutzer auf der Blacklist.")
                return
            }
            const embed = new Discord.EmbedBuilder()
                .setTitle("Blacklist")
                .setDescription(res.map(r => `<@${r.dcid}>, \`${r.dcid}\``).join("\n"))
                .setColor(config.standard_color)
                .setTimestamp()
                .setFooter({
                    text: interaction.guild ? interaction.guild.name : interaction.user.tag,
                    iconURL: interaction.guild ? interaction.guild.iconURL() : interaction.user.avatarURL()
                })
            interaction.reply({ embeds: [embed] })
            return
        } catch (err) {
            //ERROR
        }
    }

    try {
        const res = await db(`SELECT dcid, blacklisted FROM discord WHERE dcid = ${user.user.id}`)
        if (res[0]) {
            if (res[0].blacklisted === 1) {
                try { await db(`UPDATE discord SET blacklisted = 0 WHERE dcid = ${user.user.id}`) } catch (err) {
                    //ERROR
                    interaction.reply("Es gab einen Fehler:\n" + err.toString().substring(0, 500))
                    return
                }
                interaction.reply(`\`${user.user.tag}\` wurde von der Blacklist entfernt.`)
            } else {
                try { await db(`UPDATE discord SET blacklisted = 1 WHERE dcid = ${user.user.id}`) } catch (err) {
                    //ERROR
                    interaction.reply("Es gab einen Fehler:\n" + err.toString().substring(0, 500))
                    return
                }
                interaction.reply(`\`${user.user.tag}\` wurde zur Blacklist hinzugefügt.`)
            }
        } else {
            interaction.reply(`\`${user.user.tag}\` konnte nicht in der Datenbank gefunden werden.`)
        }
    } catch (err) {
        //ERROR
        interaction.reply("Es gab einen Fehler:\n" + err.toString().substring(0, 500))
        return
    }

}