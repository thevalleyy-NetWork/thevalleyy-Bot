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

        if (message.content.toLowerCase().includes('tali') || message.content.toLowerCase().includes('valley')) {
            message.react('<:POGGIES:786251968841515049>').catch((error) => {
                const embedSUS = new Discord.MessageEmbed()
                    .setTitle('Es gab einen Fehler beim reagieren auf eine tali Message.')
                    .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                    .setDescription('Fehler: `' + error + '`')
                    .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('fc036b')
                client.channels.cache.get(botlog).send({ embeds: [embedSUS] })
            })
        }
    })
}