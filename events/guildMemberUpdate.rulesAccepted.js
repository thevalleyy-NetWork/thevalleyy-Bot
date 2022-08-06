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

module.exports = async (client, oldMember, newMember) => {
        const iconurl = client.guilds.cache.get(newMember.guild.id).iconURL()
        try {    
            if (oldMember.pending === newMember.pending) return
            if (newMember.pending === false) {
                const niceone = newMember.guild.roles.cache.find(role => role.name === 'Nice One').id
                const mitglied = newMember.guild.roles.cache.find(role => role.name === 'Mitglied').id
                const user = newMember.guild.members.cache.get(newMember.user.id)

                user.roles.add(mitglied)

                // niceone check
                if (await db(`SELECT dcid FROM discord WHERE niceone != 1 AND dcid = ${newMember.user.id}`).then(res => res[0])) return client.channels.cache.get(modlog).send("Serverregeln akzeptiert: <@" + newMember.user.id + ">, `" + newMember.user.id + "`\nHat Nice One bekommen: Nein")
                client.channels.cache.get(modlog).send("Serverregeln akzeptiert: <@" + newMember.user.id + ">, `" + newMember.user.id + "`\nHat Nice One bekommen: Ja")
                
                user.roles.add(niceone)
            }


        } catch (error) {
            client.channels.cache.get(modlog).send("cringe error" + error)
        }
}