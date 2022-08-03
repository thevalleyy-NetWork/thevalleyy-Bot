const config = require('../../config.json');
const Discord = require('discord.js')
const mysql = require('mysql')
const util = require('util')

var connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)

module.exports = {
    commands: ['database', 'db'],
    expectedArgs: '<sql statement>',
    permissionError: 'Du hast keine Berechtigung, diesen Befehl auszuführen',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: "Access the database associated with the bot via a command",
    callback: async(message, arguments, text) => {

        // -db "SELECT * FROM discord WHERE blacklisted = 1"

        try {
            await db(`${text}`).then(async res => {
                if (await !res[0]) return message.reply("[]")
                message.reply(`\`\`\`json\n${JSON.stringify(res, null, 4).substring(0, 1980)}${(JSON.stringify(res, null, 4).length > 1980) ? "\n..." : ""}\`\`\``)
            })
        } catch (e) {
            message.reply("Fehler beim Ausführen des Statements:\n`" + e + "`")
        }
    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}