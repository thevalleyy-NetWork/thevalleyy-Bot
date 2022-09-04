const Discord= require('discord.js')
module.exports = (client, message) => {
    if (message.author.bot || message.guild === null || message.channel.type == Discord.ChannelType.DM) return

        if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
            const config = require('./../config.json')
            message.reply(`Hallo \`${message.author.username}\`, mit **${config.prefix}** höre ich auf dich! <:POGGIES:786251968841515049>\nFür Hilfe nutze \`${config.prefix}help\``)
        }
}