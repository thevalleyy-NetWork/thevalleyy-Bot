module.exports = {
    commands: ['clear', 'purge', 'cls'],
    expectedArgs: '<amount>',
    permissionError: 'Unzureichende Rechte',
    minArgs: 1,
    maxArgs: 1,
    callback: async(message, arguments, text) => {

        let clearmsg = +arguments[0]
        var iconurl = message.guild.iconURL({ dynamic: true })
        const mod - log = '822575095721099304'
        const Discord = require('discord.js')


        if (Number.isNaN(clearmsg)) {
            message.reply(arguments[0].substring(0, 50) + " ist keine Zahl.")
            return
        }
        try {
            message.delete()

            if (clearmsg === 1) {
                await message.channel.bulkDelete(clearmsg + 1)
                message.channel.send('Es wurde `eine` Nachricht gelöscht. \nAusgeführt durch: ' + message.author.tag)
            } else if (clearmsg >= 2) {
                await message.channel.bulkDelete(clearmsg + 1)
                message.channel.send('Es wurden `' + clearmsg + '` Nachrichten gelöscht. \nAusgeführt durch: ' + message.author.tag)
            } else message.channel.send("Du kannste keine " + clearmsg + " Nachrichten löschen, " + message.author.username)

            const embedsuccess = new Discord.MessageEmbed()
                .setTitle('Es wurden `' + clearmsg + '` Nachrichten gelöscht.')
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('03f8fc')
            message.client.channels.cache.get(mod - log).send({ embeds: [embedsuccess] });
        } catch (error) {
            const embedfail = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler beim Löschen von Nachrichten')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField('Von: ' + message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(mod - log).send({ embeds: [embedfail] });
            message.channel.send('Die Nachrichtn konnten nicht gelöscht werden. `' + error + '`')
        }

    },
    permissions: [],
    requiredRoles: ['Supporter']
}