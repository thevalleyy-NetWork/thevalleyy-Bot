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
    commands: ['niceone', 'no'],
    expectedArgs: '<user>',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const botlog = '822575095721099304'
        const Discord = require('discord.js')

        getMember(message)
        let user = getMember(message, arguments[0])
        let Role = message.member.guild.roles.cache.find(role => role.name === 'Nice One').id

        if (!user) {
            message.reply('Der User `' + arguments[0].substring(0, 50) + '` konnte nicht gefunden werden.')
            return
        }

        if (user.id === '506746108345843713' || user.id === '785166173548445726') {
            message.react('<:3Head:786252274204016670>')
            return
        }
        if (user.id == message.author.id) {
            message.reply('So funktioniert das nicht :eyes:')
            return
        }
        try {
            if (user.roles.cache.has(Role)) {
                user.roles.remove(Role)
                message.reply('`' + user.user.tag + '` wurde `Nice One` entzogen.')

                const successEmbed1 = new Discord.MessageEmbed()
                    .setTitle('-niceone ausgeführt')
                    .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                    .setDescription('`' + user.user.tag + '`')
                    .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('03f8fc')
                message.client.channels.cache.get(botlog).send({ embeds: [successEmbed1] })

            } else {
                user.roles.add(Role)
                message.reply('`' + user.user.tag + '` wurde `Nice One` hinzugefügt.')

                const successEmbed2 = new Discord.MessageEmbed()
                    .setTitle('-mute ausgeführt')
                    .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                    .setDescription('`' + user.user.tag + '` wurde Nice One hinzugefügt.')
                    .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('03f8fc')
                message.client.channels.cache.get(botlog).send({ embeds: [successEmbed2] })
            }
        } catch (error) {
            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -niceone')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(botlog).send({ embeds: [failEmbed] })

            message.reply('Es gab einen Fehler.')
        }

    },
    permissions: [],
    requiredRoles: ['Supporter']
}