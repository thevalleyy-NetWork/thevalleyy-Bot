module.exports = {
    commands: ['neko'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    callback: async(message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const Discord = require('discord.js')
        const nekochannel = '799728881228709928'
        const fetch = require('node-fetch')

        if (message.channel.id !== nekochannel) {
            message.reply(`${message.author.username}, ${message.guild.channels.cache
        .get(nekochannel)
        .toString()} ist der richtige Kanal.`)
            return
        }
        var types = ['hug', 'cry', 'smug', 'slap', 'pat', 'laugh', 'feed', 'cuddle']
        var randomType = types[Math.floor(Math.random() * types.length)]

        try {
            const { image } = await fetch('http://api.nekos.fun:8080/api/' + randomType).then(response => response.json())
            message.reply(image)
        } catch (error) {
            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -neko')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send(({ embeds: [failEmbed] }))
            message.reply('Es gab einen Fehler.')
        }

    },
    permissions: [],
    requiredRoles: ['Nice One']
}