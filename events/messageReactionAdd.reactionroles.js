const modlog = '822575095721099304'
const Discord = require('discord.js')
module.exports = (client, reaction, user) => {
        if (reaction.message.guild === null) return
        if (user === client.user) return
        if (user.bot) return
        if (reaction.message.id !== '844912109154598912') return

        var iconurl = client.guilds.cache.get("631518992342843392").iconURL()

        try {
            let botRole = reaction.message.member.guild.roles.cache.find(role => role.name === 'BotNews').id
            let newsRole = reaction.message.member.guild.roles.cache.find(role => role.name === 'News').id
            let mcRole = reaction.message.member.guild.roles.cache.find(role => role.name === 'Minecraft').id
            let userObj = reaction.message.guild.members.cache.get(user.id)

            if (reaction.emoji.id === '800645521277452298') {
                userObj.roles.add(botRole)
                client.channels.cache.get(modlog).send('<@' + user.id + '> hat nun die BotNews <:BotNews:800645521277452298> Rolle bekommen. \n Seine ID: `' + user.id + '`, `' + user.createdAt.toLocaleString() + '`')
                return
            }


            if (reaction.emoji.id === '800643239241711638') {
                userObj.roles.add(newsRole)
                client.channels.cache.get(modlog).send('<@' + user.id + '> hat nun die News <:News:800643239241711638> Rolle bekommen. \n Seine ID: `' + user.id + '`, `' + user.createdAt.toLocaleString() + '`')
                return
            }

            if (reaction.emoji.id === '844909801297018891') {
                userObj.roles.add(mcRole)
                client.channels.cache.get(modlog).send('<@' + user.id + '> hat nun die Minecraft <:Minecraft:844909801297018891> Rolle bekommen. \n Seine ID: `' + user.id + '`, `' + user.createdAt.toLocaleString() + '`')
            }
        } catch (error) {
            console.log(error)
        }
    }