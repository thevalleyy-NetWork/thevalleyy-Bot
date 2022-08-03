const config = require('../../config.json');
const Discord = require('discord.js')
const mysql = require('mysql')
const util = require('util')

var connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)

function getMember(message, toFind = '') {
    toFind = toFind.toLowerCase()
    let target = message.guild.members.cache.get(toFind)

    if (!target && message.mentions.members)
        target = message.mentions.members.first()

    if (!target && toFind) {
        target = message.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind)
        })
    }

    if (!target) return
    return target
}

module.exports = {
    commands: ['blacklist', 'bl'],
    expectedArgs: '[user]',
    permissionError: 'Du hast keine Berechtigung, diesen Befehl auszuführen',
    minArgs: 0,
    maxArgs: 1,
    cooldown: null,
    description: "this description is weird",
    callback: async(message, arguments, text) => {


        if (!arguments[0]) {
            try {
                const res = await db(`SELECT dcid FROM discord WHERE blacklisted = 1`)
                if (res.length == 0) {
                    message.reply("Es sind keine Nutzer auf der Blacklist.")
                    return
                }
                const embed = new Discord.EmbedBuilder()
                    .setTitle("Blacklist")
                    .setDescription(res.map(r => `<@${r.dcid}>, \`${r.dcid}\``).join("\n"))
                    .setColor(config.standard_color)
                    .setTimestamp()
                    .setFooter({
                        text: message.guild.name,
                        iconURL: message.guild.iconURL({ dynamic: true })
                    })
                message.reply({ embeds: [embed] })
                return
            } catch (err) {
                message.reply("Es gab einen Fehler:\n" + err.toString().substring(0, 500))
                return
            }
        }


        const user = getMember(message, arguments[0])
        if (!user) {
            message.reply(`\`${arguments[0].substring(0, 50)}\` konnte nicht gefunden werden.`)
            return
        }

        try {
            const res = await db(`SELECT dcid, blacklisted FROM discord WHERE dcid = ${user.user.id}`)
            if (res[0]) {
                if (res[0].blacklisted === 1) {
                    try { await db(`UPDATE discord SET blacklisted = 0 WHERE dcid = ${user.user.id}`) } catch (err) {
                        message.reply("Es gab einen Fehler:\n" + err.toString().substring(0, 500))
                        return
                    }
                    message.reply(`\`${user.user.tag}\` wurde von der Blacklist entfernt.`)
                } else {
                    try { await db(`UPDATE discord SET blacklisted = 1 WHERE dcid = ${user.user.id}`) } catch (err) {
                        message.reply("Es gab einen Fehler:\n" + err.toString().substring(0, 500))
                        return
                    }
                    message.reply(`\`${user.user.tag}\` wurde zur Blacklist hinzugefügt.`)
                }
            } else {
                message.reply(`\`${user.user.tag}\` konnte nicht in der Datenbank gefunden werden.`)
            }
        } catch (err) {
            message.reply("Es gab einen Fehler:\n" + err.toString().substring(0, 500))
            return
        }


    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}