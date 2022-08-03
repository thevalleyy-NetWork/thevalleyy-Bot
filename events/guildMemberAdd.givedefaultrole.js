const modlog = '822575095721099304'
const Discord = require('discord.js')

const config = require('./../config.json')
const mysql = require('mysql')
const util = require('util')

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

const db = util.promisify(connection.query).bind(connection)

module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL()
    client.on("guildMemberAdd", async(member) => {
        try {
            const res = await db(`SELECT * FROM discord WHERE dcid = ${member.id}`)
            const user = res[0]
            if (user.muted == 0) return

            let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Nice One').id
            setTimeout(() => member.roles.add(welcomeRole), 4000)
        } catch (error) {
            const embedError = new Discord.EmbedBuilder()
                .setTitle('Es gab einen Fehler beim Vergeben einer der Nice One Rolle')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addFields([{ name: member.user.tag, value: "Nice One"}])
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('#fc036b')
            client.channels.cache.get(modlog).send({ embeds: [embedError] })
        }

    })
}