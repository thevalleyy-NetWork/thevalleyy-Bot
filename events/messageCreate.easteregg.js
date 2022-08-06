const { ChannelType } = require('discord.js')
module.exports = (client, message) => {
        if (message.guild === null) return
        if (message.author.bot) return
        if (!message.guild.available) return
        if (message.channel.type == ChannelType.DM) return
        if (message.webhookId) return

        if (message.content.toLowerCase().includes('tali') || message.content.toLowerCase().includes('valley')) {
            message.react('<:POGGIES:786251968841515049>').catch()
        }
}