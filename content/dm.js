const mod - log = '822575095721099304'
const Discord = require('discord.js')

module.exports = (client) => {
    client.on('messageCreate', message => {
        if (message.channel.type !== "DM") return
        if (message.author.id == '506746108345843713') return
        if (message.author.bot) return

        let blacklist = new Discord.MessageEmbed()
            .setColor('e31212')
            .setDescription("Fehler: Du bist blacklisted.")

        var blacklistarray = ["", "", "", ""]
        if (blacklistarray.includes(message.author.id)) {
            message.channel.send({ embeds: [blacklist] })
            return
        }
        try {
            message.client.users.fetch('506746108345843713', false).then((user) => {

                const embedDM = new Discord.MessageEmbed()
                    .setTitle('Feedback <:hm:907936051300012072>')
                    .setThumbnail(message.author.avatarURL())
                    .addField('`' + message.author.tag + '`:', message.content.substring(0, 1000))
                    .setFooter('Meine DMs, ' + message.author.username + 's ID: ' + message.author.id)
                    .setTimestamp()
                    .setColor('b51cbd')

                user.send({ embeds: [embedDM] })
                message.react('<:check:840154786568339497>')
            })
        } catch (error) {
            const embedFail = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler beim Verarbeiten einer DM')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', message.guild.iconURL())
                .setTimestamp()
                .setColor('fc036b')
            client.channels.cache.get(mod - log).send({ embeds: [embedFail] })
            return
        }
    })
}