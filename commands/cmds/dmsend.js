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
    commands: ['dm'],
    expectedArgs: '<user> <message>',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 2,
    maxArgs: null,
    callback: async(message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const Discord = require('discord.js')

        getMember(message)
        let user = getMember(message, arguments[0])

        if (!user) {
            message.reply('Der User `' + arguments[0].substring(0, 50) + '` konnte nicht gefunden werden.')
            return
        }
        if (user.id === '506746108345843713' || user.id === '785166173548445726') {
            message.reply('Dms an `' + user.user.username + '` sind nicht erlaubt.')
            return
        }
        if (user.id == message.author.id) {
            message.reply('Du kannst dir nicht selber eine Nachricht schicken.')
            return
        }

        try {
            await user.user.send(text.split(' ').slice(1).join(' ').substring(0, 2000))
            message.reply('Die Nachricht wurde an `' + user.user.tag + '` versandt.')

            const successEmbed = new Discord.MessageEmbed()
                .setTitle('-dm ausgeführt')
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                .setDescription('Text: `' + text.split(' ').slice(1).join(' ').substring(0, 35) + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('03f8fc')
            message.client.channels.cache.get(modlog).send({ embeds: [successEmbed] })
        } catch (error) {
            message.reply('Die Nachricht konnte nicht an `' + user.user.tag + '` versendet werden.')

            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -dm')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send({ embeds: [failEmbed] })
            return
        }
    },
    permissions: [],
    requiredRoles: ['Supporter']
}