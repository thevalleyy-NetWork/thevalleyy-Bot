const config = require('./../config.json')
const modlog = '822575095721099304'
const Discord = require('discord.js')
const channelId = '786239944581840956'
const mysql = require('mysql')
const util = require('util')
const muterole = "692016581823168632"
const vcmuterole = "685814796746358838"

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

const db = util.promisify(connection.query).bind(connection)

module.exports = client => {
    client.on('guildMemberAdd', async(member) => {
        if (member.guild.id != '631518992342843392') return

        // was the user here before?
        try {
            if (await db(`SELECT dcid FROM discord WHERE dcid = ${member.id}`).then(res => res[0])) {
                try {
                    const res = await db(`SELECT * FROM discord WHERE dcid = ${member.id}`)
                    const user = res[0]
                    if (user.muted == 1) {
                        member.roles.add(muterole)
                        member.user.send("Denkste")
                    }
                    if (user.voicemuted == 1) {
                        member.roles.add(vcmuterole)
                        member.user.send("Denkste")
                    }
                    if (user.dctag !== member.user.tag) {
                        await db(`UPDATE discord SET dctag = '${member.user.tag}' WHERE dcid = ${member.id}`)
                    }
                    await db(`UPDATE discord SET joindate = ${Date.now()} WHERE dcid = ${member.id}`)
                } catch (e) {
                    member.guild.channels.cache.get(modlog).send(`Fehler beim Abfragen von ${member.user.tag} in der Datenbank: ${e}`)
                }
            } else {
                const message = `Herzlich Willkommen, <@${member.id}> auf dem **thevalleyy-NetWork**. \nLese dir noch das <#786239847554875402> durch, dann kannst du loslegen! :D`
                const channel = member.guild.channels.cache.get(channelId)
                channel.send(message).then(message => {
                    setTimeout(() => message.react('a:PeepoHey:844822512495755264'), 50)
                })

                // insert into db
                try {
                    await db(`INSERT INTO discord (dcid, dctag, joindate, oldestjoindate) VALUES (${member.id}, '${member.user.tag}', ${Date.now()}, ${Date.now()})`)
                } catch (e) { member.guild.channels.cache.get(modlog).send(`Fehler beim Eintragen von ${member.user.tag} in die Datenbank: ${e}`) }

            }
        } catch (err) {
            member.guild.channels.cache.get(modlog).send(`Fehler beim Abfragen von ${member.user.tag} in der Datenbank: ${err}`)
        }
    })
}