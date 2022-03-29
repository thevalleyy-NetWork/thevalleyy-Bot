const modlog = '822575095721099304'
const Discord = require('discord.js')
module.exports = (client) => {
    client.on("messageCreate", message => {
        if (message.guild === null) return
        if (message.author.bot) return
        if (!message.guild.available) return
        if (message.channel.type == "DM") return
        if (message.webhookId) return

        if (message.content === '<@!785166173548445726>') {
            const config = require('./../config.json')
            message.reply(`Hallo ${message.author.username}, mit **${config.prefix}** höre ich auf dich! <:POGGIES:786251968841515049>`)
        }
    })
}