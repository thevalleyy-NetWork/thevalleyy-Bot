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

const mysql = require('mysql')
const util = require('util')
const config = require('../config.json')

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

const db = util.promisify(connection.query).bind(connection)

module.exports = {
    commands: ['unmute'],
    expectedArgs: '<user> [reason]',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: "Unmutet den angegebenen Nutzer",
    callback: (message, arguments, text) => {

        const iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const Discord = require('discord.js')

        getMember(message)
        let muteUser = getMember(message, arguments[0])
        let muteRole = message.member.guild.roles.cache.find(role => role.name === 'Muted Chat').id

        if (!muteUser) {
            message.reply('Der User `' + arguments[0].substring(0, 50) + '` konnte nicht gefunden werden.')
            return
        }
        if (!muteUser.roles.cache.has(muteRole)) {
            message.reply('`' + muteUser.user.tag + '` ist nicht gestummt.')
        } else {
            try {
                db(`UPDATE discord set muted = 0 WHERE dcid = ${muteUser.id}`)

                if (!arguments[1]) {
                    muteUser.roles.remove(muteRole, `Mute von: ${message.author.tag}`)
                    message.reply('`' + muteUser.user.tag + '` kann nun wieder schreiben.')
                    muteUser.user.send('Du wurdest von `' + message.author.tag + '` auf dem Server `' + message.guild.name + '` entmuted.')
                        .catch(error => message.client.channels.cache.get(modlog).send('Fehler beim Senden der Nachricht an `' + muteUser.user.tag + '`:\n`' + error + '`'))

                } else {
                    muteUser.roles.remove(muteRole, `Mute von: ${message.author.tag}, Grund: ${text.substring(0, 300).split(' ').slice(1).join(' ')}`)
                    message.reply('`' + muteUser.user.tag + '` kann nun wieder schreiben.')
                    muteUser.user.send('Du wurdest von `' + message.author.tag + '` auf dem Server `' + message.guild.name + '` entmuted.\nGrund: `' + text.substring(0, 300).split(' ').slice(1).join(' ') + '`')
                        .catch(error => message.client.channels.cache.get(modlog).send('Fehler beim Senden der Nachricht an `' + muteUser.user.tag + '`:\n`' + error + '`'))
                }
            } catch (error) {
                const failEmbed = new Discord.EmbedBuilder()
                    .setTitle('Es gab einen Fehler bei -unmute')
                    .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                    .setDescription('Fehler: `' + error + '`')
                    .addFields([{ name: message.author.tag, value: 'in <#' + message.channel.id + '>'}])
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('#fc036b')
                message.client.channels.cache.get(modlog).send({ embeds: [failEmbed] })

                message.reply('Es gab einen Fehler.')
            }
        }
    },
    permissions: [],
    requiredRoles: ['Supporter']
}