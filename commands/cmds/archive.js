module.exports = {
    commands: ['archive'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const botlog = '822575095721099304'
        const Discord = require('discord.js')

        try {
            if (message.channel.name.startsWith('🔒-')) {
                message.channel.setParent("843825828918722580")
                message.channel.bulkDelete('1')
                message.channel.send('Das Ticket wurde archiviert. Ausführender: `' + message.author.tag + '`')

                setTimeout(() => message.channel.setName(message.channel.name.replace('🔒', '📑')), 900000)

                const embedSuccess = new Discord.MessageEmbed()
                    .setTitle('Ein Ticket wurde per Command archiviert')
                    .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                    .addField(message.author.tag, ' in <#' + message.channel.name + '>')
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('03f8fc')
                message.client.channels.cache.get(botlog).send({ embeds: [embedSuccess] })

            } else { message.reply('`-archive` kann nur in geschlossenen Tickets ausgeführt werden.') }

        } catch (error) {
            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -archive')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')

            message.client.channels.cache.get(botlog).send({ embeds: [failEmbed] })
        }
    },
    permissions: [],
    requiredRoles: ['Moderator']
}