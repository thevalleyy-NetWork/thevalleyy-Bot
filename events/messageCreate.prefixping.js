const { ChannelType } = require('discord.js')
module.exports = (client) => {
    client.on("messageCreate", message => {
        if (message.guild === null) return
        if (message.author.bot) return
        if (!message.guild.available) return
        if (message.channel.type == ChannelType.DM) return
        if (message.webhookId) return

        if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
            const config = require('./../config.json')
            message.reply(`Hallo ${message.author.username}, mit **${config.prefix}** höre ich auf dich! <:POGGIES:786251968841515049>\nFür Hilfe nutze \`${config.prefix}help\``)
        }
    })
}