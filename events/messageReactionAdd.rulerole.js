const modlog = '822575095721099304'
const Discord = require('discord.js')
var blacklistarray = ["", "", "", ""]
module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL()

    client.on('messageReactionAdd', async(reaction, user) => {
        if (reaction.message.guild === null) return
        if (user === client.user) return
        if (user.bot) return
        if (reaction.message.id !== '819541946434715660') return

        try {
            let regelRole = reaction.message.member.guild.roles.cache.find(role => role.name === 'Mitglied').id
            let userObj = reaction.message.guild.members.cache.get(user.id)

            if (reaction.emoji.name === '✅') {
                if (blacklistarray.includes(user.id)) return

                userObj.roles.add(regelRole)
                client.channels.cache.get(modlog).send('<@' + user.id + '> hat nun die Mitglied `📕` Rolle bekommen. \n Seine ID: `' + user.id + '`')
            }
        } catch (error) {
            const embedError = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei ReactionRoles (+Mitglied)')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(user.tag, 'in <#' + reaction.message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send({ embed: embedError })
        }
    })

    client.on('messageReactionRemove', async(reaction, user) => {
        if (reaction.message.guild === null) return
        if (user == client.user) return
        if (user.bot) return
        if (reaction.message.id !== '819541946434715660') return

        try {
            let regelRole = reaction.message.member.guild.roles.cache.find(role => role.name === 'Mitglied').id
            let userObj = reaction.message.guild.members.cache.get(user.id)

            if (reaction.emoji.name === '✅') {
                if (blacklistarray.includes(user.id)) return

                userObj.roles.remove(regelRole)
                client.channels.cache.get(modlog).send('<@' + user.id + '> hat nun die Mitglied `📕` Rolle entfernt bekommen. \n Seine ID: `' + user.id + '`')
            }
        } catch (error) {
            const embedError = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei ReactionRoles (-Mitglied)')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(user.tag, 'in <#' + reaction.message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send({ embed: embedError })
        }
    })
}