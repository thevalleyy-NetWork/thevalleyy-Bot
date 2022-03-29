module.exports = {
    commands: ['eval'],
    expectedArgs: '<code>',
    permissionError: 'Unzureichende Rechte.',
    minArgs: 1,
    maxArgs: null,
    callback: async(message, arguments, text) => {
        const config = require('./../../config.json')
        const util = require('util')
        var iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
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


            message.reply('```js\n' + output.substring(0, 1950) + '```')



        } catch (error) {
            message.reply('Fehler bei -eval in <#' + message.channel.id + '>  |  ``' + error + '``')
        }


    },
    permissions: [],
    requiredRoles: ['Mitglied']
}