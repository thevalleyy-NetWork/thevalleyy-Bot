const Discord = require('discord.js')
const { PermissionsBitField } = require('discord.js')
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
    commands: ['kick'],
    expectedArgs: '<user> [reason]',
    permissionError: 'Unzureichende Rechte',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: "this description is weird",
    callback: async(message, arguments, text) => {

        const iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const reason = text.split(' ').slice(1).join(' ')
        let member = getMember(message, arguments[0])

        if (!member) {
            message.reply('Der User `' + arguments[0].substring(0, 100) + '` konnte nicht gefunden werden.')
            return
        }

        if (member.id === message.author.id) {
            message.reply('Du kannst dich nicht selbst kicken, ' + message.author.username)
            return
        }

        try {
            if (arguments[1]) {
                try {
                    await member.user.send("Du wurdest auf dem Server `" + message.guild.name + "` mit dem Grund `" + reason + "` von `" + message.author.tag + "`gekickt.")
                } catch (e) {
                    message.client.channels.cache.get(modlog).send(`Error at kick: \`${e}\``)
                }
                member.kick(reason.toString() + ", Kick von: " + message.author.tag)
                await message.reply('Der User `' + member.user.tag + '` wurde mit dem Grund `' + reason + '` gekickt.')
            } else {
                try {
                    await member.user.send("Du wurdest auf dem Server `" + message.guild.name + "` von `" + message.author.tag + "` gekickt.")
                } catch (e) {
                    message.client.channels.cache.get(modlog).send(`Error at kick: \`${e}\``)
                }
                member.kick("Kick von: " + message.author.tag)
                await message.reply('Der User `' + member.user.tag + '` wurde gekickt.')
            }
        } catch (error) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('Es gab einen Fehler bei -kick')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addFields([{ name: message.author.tag, value: 'in <#' + message.channel.id + '>'}])
                .setFooter({ text: message.guild.name, iconURL: iconurl})
                .setTimestamp()
                .setColor('#fc036b')
            message.client.channels.cache.get(modlog).send({ embeds: [embed] })
            message.reply('Der User `' + member.user.tag + '` konnte nicht gekickt werden:\n`' + error + '`')
        }
    },
    permissions: [],
    requiredRoles: ['Supporter']
}