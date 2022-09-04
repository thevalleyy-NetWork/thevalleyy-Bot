const Discord = require('discord.js');
const config = require('../../config.json');
const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

const db = util.promisify(connection.query).bind(connection)


module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const user = interaction.options.get("user")
    const role = interaction.guild.roles.cache.find(role => role.name === 'Nice One').id

        if (user.user.id == config.owner || user.user.id == client.user.id) return interaction.reply('<:3Head:786252274204016670>')
        if (user.user.id == interaction.user.id) return interaction.reply('Versuchs mal mit \`/ban @' + interaction.user.username + '\`')

        try {
            if (user.member.roles.cache.has(role)) {
                user.member.roles.remove(role)
                db(`UPDATE discord set niceone = 0 WHERE dcid = ${user.user.id}`)

                interaction.reply('`' + user.user.tag + '` wurde `Nice One` entzogen.')


            } else {
                user.member.roles.add(role)
                db(`UPDATE discord set niceone = 1 WHERE dcid = ${user.user.id}`)

                interaction.reply('`' + user.user.tag + '` hat `Nice One` bekommen.')
            }
    	} catch (error) {
            //ERROR
            console.log(error)
            interaction.reply('Ein Fehler ist aufgetreten.')
        }
}