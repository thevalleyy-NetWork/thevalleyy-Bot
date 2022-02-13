const botlog = '822575095721099304'
const Discord = require('discord.js')
module.exports = (client) => {

    client.on("messageCreate", (message) => {
        if (message.guild === null) return
        if (message.author.bot) return
        if (!message.guild.available) return
        if (message.channel.type == "DM") return
        if (message.webhookId) return

        var iconurl = message.guild.iconURL({ dynamic: true })

        try {
            if (message.content.toLowerCase().includes("johannes", "johanes", "johanis")) {
                if (message.guild.members.cache.get(message.author.id).roles.cache.has("631521181752885268")) return
                if (message.guild.members.cache.get(message.author.id).roles.cache.has("726146482314674197")) return

                message.delete()
                const embed = new Discord.MessageEmbed()
                    .setTitle("Anti-Nameleak")
                    .setColor(0xFF0000)
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(message.author.username + " wollte folgenden Text senden:")
                    .addField("message.content:", "`" + message.content.substring(0, 1000) + "`")
                    .addField("message.channel:", `${message.channel}`)
                    .setFooter(message.guild.name, iconurl)
                    .setTimestamp()
                client.channels.cache.get(botlog).send({ embeds: [embed] })
            }
        } catch (error) {
            const embedSUS = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler (Anti-Nameleak)')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            client.channels.cache.get(botlog).send({ embeds: [embedSUS] })
        }
    })
}