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
    commands: ['ban'],
    expectedArgs: '<user> [reason]',
    permissionError: 'Unzureichende Rechte',
    minArgs: 1,
    maxArgs: null,
    callback: async(message, arguments, text) => {

        const Discord = require('discord.js')
        var iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const reason = text.split(' ').slice(1).join(' ')
        let member = getMember(message, arguments[0])

        if (!member) {
            message.reply('Der User `' + arguments[0].substring(0, 50) + '` konnte nicht gefunden werden.')
            return
        }

        if (member.id === message.author.id) {
            message.reply('Du kannst dich nicht selbst bannen, ' + message.author.username)
            return
        }

        try {
            if (arguments[1]) {
                try {
                    await member.user.send("Du wurdest auf dem Server `" + message.guild.name + "` mit dem Grund `" + reason + "` gebannt.")
                } catch (e) {
                    message.client.channels.cache.get(modlog).send(`Error at ban: \`${e}\``)
                }
                member.ban({ reason: reason + ", " + message.author.tag })
                await message.reply('Der User `' + member.user.tag + '` wurde mit dem Grund `' + reason + '` gebannt.')
            } else {
                try {
                    await member.user.send("Du wurdest auf dem Server `" + message.guild.name + "` gebannt.")
                } catch (e) {
                    message.client.channels.cache.get(modlog).send(`Error at ban: \`${e}\``)
                }
                member.ban({ reason: message.author.tag })
                await message.reply('Der User `' + member.user.tag + '` wurde gebannt.')
            }
        } catch (error) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -ban')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send({ embeds: [embed] })
            message.reply('Der User `' + member.user.tag + '` konnte nicht gebannt werden:\n`' + error + '`')
        }
    },
    permissions: ['BAN_MEMBERS'],
    requiredRoles: ['Moderator']
}