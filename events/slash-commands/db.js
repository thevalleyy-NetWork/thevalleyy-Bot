const config = require('../../config.json')
const Discord = require('discord.js')
const mysql = require('mysql2')
const util = require('util')

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

    try {
        await db(`${interaction.options.getString("sql")}`).then(async res => {
            if (await !res[0]) return interaction.reply("[]")
            interaction.reply(`\`\`\`json\n${JSON.stringify(res, null, 4).substring(0, 1980)}${(JSON.stringify(res, null, 4).length > 1980) ? "\n..." : ""}\`\`\``)
        })
    } catch (e) {
        //ERROR
        interaction.reply("Fehler beim Ausführen des Statements:\n`" + e + "`")
    }

}