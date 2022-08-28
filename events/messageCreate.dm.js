const modlog = '822575095721099304'
const { ChannelType } = require('discord.js')
const Discord = require('discord.js')
const config = require('../config.json')

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

const  db = util.promisify(connection.query).bind(connection)


module.exports = async (client, message) => {
        if (message.channel.type !== ChannelType.DM) return
        if (message.author.id == '506746108345843713') return
        if (message.author.bot) return

        try {
            if (await db(`SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${message.author.id}`).then(res => res[0]).catch(err => {})) return


            message.client.users.fetch('506746108345843713', false).then((user) => {

                const embedDM = new Discord.EmbedBuilder()
                    .setTitle('Feedback oder so <:hm:907936051300012072>')
                    .setThumbnail(message.author.avatarURL())
                    .addFields([{ name: '`' + message.author.tag + '`:', value: message.content.substring(0, 1000)}])
                    .setFooter({ text: 'Meine DMs, ' + message.author.username + 's ID: ' + message.author.id})
                    .setTimestamp()
                    .setColor('#b51cbd')

                user.send({ embeds: [embedDM] })
                message.react('<:checkmarkEmbed:1005146896278503597> ')
            })
        } catch (error) {
            throw(error)
        }
}