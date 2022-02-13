module.exports = {
    commands: ['eval'],
    expectedArgs: '<code>',
    permissionError: 'Unzureichende Rechte.',
    minArgs: 1,
    maxArgs: null,
    callback: async(message, arguments, text) => {
        const fs = require('fs')
        const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
        const util = require('util')
        var iconurl = message.guild.iconURL({ dynamic: true })
        const botlog = '822575095721099304'
        const Discord = require('discord.js')

        if (message.author.id !== '506746108345843713') {
            message.react('<:hm:907936051300012072>')
            return
        }

        const evalcode = text

        if (text.toString().toLowerCase().includes('client.token')) {
            message.react('<:hm:907936051300012072>')
            return
        }
        try {
            const result = await eval(evalcode)
            let output = result
            if (typeof result !== 'string') {
                output = util.inspect(result)
            }

            const embedSuccess = new Discord.MessageEmbed()
                .setTitle('-eval ausgeführt')
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .addField('Code:', '`' + evalcode.substring(0, 690) + '`')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('03f8fc')
            message.client.channels.cache.get(botlog).send({ embeds: [embedSuccess] })
            message.client.channels.cache.get(botlog).send('```js\n' + output.substring(0, 1950) + '```')



        } catch (error) {
            message.reply('Fehler bei -eval in <#' + message.channel.id + '>  |  ``' + error + '``')
        }


    },
    permissions: [],
    requiredRoles: ['Mitglied']
}