const Discord = require('discord.js')
module.exports = (client, message) => {
    if (message.author.bot || message.guild === null || message.channel.type == Discord.ChannelType.DM) return

        if (message.content.toLowerCase().includes('tali') || message.content.toLowerCase().includes('valley')) {
            message.react('<:POGGIES:786251968841515049>').catch()
        }
}