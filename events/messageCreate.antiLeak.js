const modlog = '822575095721099304'
const Discord = require('discord.js')
const { ChannelType } = require('discord.js')
module.exports = (client, message) => {
        if (message.guild === null) return
        if (message.author.bot) return
        if (!message.guild.available) return
        if (message.channel.type == ChannelType.DM) return
        if (message.webhookId) return

        var iconurl = message.guild.iconURL({ dynamic: true })

        try {
            const regex = /[ ⠀​     👨🏻‍🚀    ]/g
            const msg = message.content.replace(regex, "")

            if (false) {
                if (message.guild.members.cache.get(message.author.id).roles.cache.has("631521181752885268")) return
                if (message.guild.members.cache.get(message.author.id).roles.cache.has("726146482314674197")) return

                message.delete()


                const embed = new Discord.EmbedBuilder()
                    .setTitle("Anti-Nameleak")
                    .setColor(0xFF0000)
                    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL()})
                    .setDescription(message.author.username + " wollte folgenden Text senden:")
                    .addFields([
                        { name: "message.content:", value: "`" + message.content.substring(0, 1000) + "`", inline: true },
                        { name: "message.channel:", value: `${message.channel}`, inline: true },
                        { name: "message.author", value: `<@!${message.author.id}>`, inline: true },
                    ])
                    .setFooter(message.guild.name, iconurl)
                    .setTimestamp()
                client.channels.cache.get(modlog).send({ embeds: [embed] })
            }
        } catch (error) {
            throw(error)
    }
}