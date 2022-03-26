module.exports = {
    commands: ['close'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const Discord = require('discord.js')


        if (!message.channel.name.startsWith('🎫-')) {
            message.reply('<#' + message.channel.id + '> ist kein Ticket.')
            return
        }
        try {
            const userID = message.channel.topic.replace('(', '').replace(')', '').split(' ').slice(9).join(' ')


            message.channel.permissionOverwrites.edit(userID, {
                VIEW_CHANNEL: false
            })

            message.channel.permissionOverwrites.edit(message.guild.id, {
                VIEW_CHANNEL: false
            })

            message.channel.setName(message.channel.name.replace('🎫', '🔒'))
            message.channel.setPosition(99)

            const embedSuccess = {
                "title": 'Wie soll nun verfahren werden?',
                "description": "Ticket archivieren?",
                "color": '8319e6',
                "footer": {
                    "icon_url": message.channel.guild.iconURL(),
                    "text": "thevalleyy-NetWork"
                },
                "thumbnail": {
                    "url": "https://cdn.pixabay.com/photo/2013/07/12/15/34/ticket-150090_960_720.png"
                },
                "author": {
                    "name": "Support-Ticket",
                    "icon_url": message.author.avatarURL()
                },
                "fields": [{
                        "name": "Ticket archivieren?",
                        "value": "<@&631521181752885268> oder <@&726146482314674197>, bitte reagieren.",
                        "inline": true
                    },
                    {
                        "name": "<:check:840154786568339497> - Ja  |  <:crosss:843826737535647745> - Nein",
                        "value": "Da ich um `04:00` Uhr restarte, kann bis dahin reagiert werden.",
                        "inline": true
                    }
                ]
            }

            message.channel.send({ embeds: [embedSuccess] }).then(embedmsg => {
                embedmsg.react('<:check:840154786568339497>').then
                embedmsg.react('<:crosss:843826737535647745>')
            })

            const embedSuccess2 = new Discord.MessageEmbed()
                .setTitle('Ein Ticket wurde geschlossen')
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                .addField(message.author.tag, ' in <#' + message.channel.name + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('03f8fc')
            message.client.channels.cache.get(modlog).send({ embeds: [embedSuccess2] })
        } catch (error) {
            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -closee')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send({ embeds: [failEmbed] })
        }
    },
    permissions: [],
    requiredRoles: ['Mitglied']
}