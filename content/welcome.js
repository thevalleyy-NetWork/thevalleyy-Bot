const botlog = '822575095721099304'
const Discord = require('discord.js')
const channelId = '786239944581840956'
module.exports = client => {
    client.on('guildMemberAdd', member => {
        if (member.guild.id != '631518992342843392') return
        const message = `Herzlich Willkommen, <@${member.id}> auf dem **thevalleyy-NetWork**. \nLese dir noch das <#786239847554875402> durch, dann kannst du loslegen! :D`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message).then(message => {
            setTimeout(() => message.react('a:PeepoHey:844822512495755264'), 50)
        })
    })
}