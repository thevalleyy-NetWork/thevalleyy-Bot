const config = require('../config.json')
const util = require('util')
const modlog = '822575095721099304'
const Discord = require('discord.js')
const mysql = require('mysql')

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)

module.exports = {
    commands: ['eval'],
    expectedArgs: '<code>',
    permissionError: 'Unzureichende Rechte.',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: "Führt Code aus",
    callback: async(message, arguments, text) => {
        const iconurl = message.guild.iconURL()

        if (message.author.id !== config.owner) {
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

            if (output.toLowerCase().includes(message.client.token.toLowerCase())) {
                message.react('<:hm:907936051300012072>')
                return
            }

            message.reply('```js\n' + output.substring(0, 1950) + '```')
            console.log("\n-----EVAL BEGIN-----\n" + output + "\n-----EVAL END-----\n")



        } catch (error) {
            message.reply('Fehler bei -eval in <#' + message.channel.id + '>  |  ``' + error + '``')
        }


    },
    permissions: [],
    requiredRoles: ['Mitglied']
}