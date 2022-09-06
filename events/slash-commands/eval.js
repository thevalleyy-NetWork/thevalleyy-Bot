const config = require('../../config.json')
const util = require('util')
const Discord = require('discord.js')
const mysql = require('mysql2')

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     
    if (interaction.user.id != config.owner) {
        interaction.reply({content: 'Du hast keine Berechtigung, diesen Befehl auszuführen.', ephemeral: true})
        return;
    }

    const evalcode = interaction.options.getString("code")

        if (evalcode.toString().toLowerCase().includes('client.token')) {
            interaction.reply('<:hm:907936051300012072>')
            return
        }
        try {
            const result = await eval(evalcode)
            let output = result
            if (typeof result !== 'string') {
                output = util.inspect(result)
            }

            if (output.toLowerCase().includes(client.token.toLowerCase())) {
                interaction.reply('<:hm:907936051300012072>')
                return
            }

            interaction.reply('```js\n' + output.substring(0, 1950) + '```')
            console.log("\n-----EVAL BEGIN-----\n" + output + "\n------EVAL END------\n")



        } catch (error) {
            //ERROR
            interaction.reply('Fehler bei -eval in <#' + interaction.channelId + '>  |  ``' + error + '``')
        }

}