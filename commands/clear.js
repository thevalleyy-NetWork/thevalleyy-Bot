const modlog = '822575095721099304'
const Discord = require('discord.js')

module.exports = {
    commands: ['clear', 'purge', 'cls'],
    expectedArgs: '<amount>',
    permissionError: 'Unzureichende Rechte',
    minArgs: 1,
    maxArgs: 1,
    cooldown: 10000,
    description: "Löscht die angegebene Anzahl an Nachrichten",
    callback: async(message, arguments, text) => {

        let clearmsg = Math.round(+arguments[0])
        const iconurl = message.guild.iconURL()
        


        if (Number.isNaN(clearmsg)) {
            message.reply(arguments[0].substring(0, 50) + " ist keine Zahl.")
            return
        }
        try {
            message.delete()

            if (clearmsg === 1) {
                await message.channel.bulkDelete(clearmsg + 1)
                message.channel.send('Es wurde `eine` Nachricht gelöscht. \nAusgeführt durch: ' + message.author.tag)
            } else if (clearmsg >= 2 && clearmsg <= 100) {
                if (clearmsg == 100) clearmsg = 99
                await message.channel.bulkDelete(clearmsg + 1)
                message.channel.send('Es wurden `' + clearmsg + '` Nachrichten gelöscht. \nAusgeführt durch: ' + message.author.tag)
            } else message.channel.send("Du kannste keine `" + clearmsg + "` Nachrichten löschen, " + message.author.username + ".\nDas Limit liegt bei 100 Nachrichten.")

        } catch (error) {
            const embedfail = new Discord.EmbedBuilder()
                .setTitle('Es gab einen Fehler beim Löschen von Nachrichten')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addFields([{name: 'Von: ' + message.author.tag, value: 'in <#' + message.channel.id + '>'}])
                .setFooter({ text: 'thevalleyy-NetWork', iconURL: iconurl})
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send({ embeds: [embedfail] });
            message.channel.send('Die Nachrichtn konnten nicht gelöscht werden. `' + error + '`')
        }

    },
    permissions: [],
    requiredRoles: ['Supporter']
}