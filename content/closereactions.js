const modlog = '822575095721099304'
const Discord = require('discord.js')


module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL()

    client.on('messageReactionAdd', async(reaction, user) => {
        if (user == client.user) return
        if (user.bot) return
        if (!reaction.emoji.id === '840154786568339497' || !reaction.emoji.id === '843826737535647745') return
        if (reaction.emoji.id === null) return
        if (reaction.message.guild === null) return
        if (!reaction.message.guild.available) return
        if (reaction.message.channel.type == "DM") return
        if (reaction.message.webhookId) return

        try {
            if (reaction.message.channel.name.startsWith('🔒-')) {
                let reactor = reaction.message.guild.members.cache.get(user.id)

                if (reactor.roles.cache.some(role => role.name === 'thevalleyy') || user2.roles.cache.some(role => role.name === 'Moderator')) {
                    if (reaction.emoji.id === '840154786568339497') {

                        reaction.message.channel.setParent("843825828918722580")
                        reaction.message.channel.bulkDelete('2')
                        reaction.message.channel.send('Das Ticket wurde archiviert. Ausführender: `' + user.tag + '`')
                            .then(message => {
                                setTimeout(() => message.channel.setName(reaction.message.channel.name.replace('🔒', '📑')), 900000)
                            })

                        const embedSuccess = new Discord.MessageEmbed()
                            .setTitle('Ein Ticket wurde per Reaktion archiviert')
                            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                            .addField(user.tag, ' in <#' + reaction.message.channel.name + '>')
                            .setFooter('thevalleyy-NetWork', iconurl)
                            .setTimestamp()
                            .setColor('03f8fc')
                        client.channels.cache.get(modlog).send({ embeds: [embedSuccess] })
                    }

                    if (reaction.emoji.id === '843826737535647745') {
                        reaction.message.channel.bulkDelete('1')
                        reaction.message.channel.send('Das Ticket wird innerhalb `60 Sekunden` gelöscht, angefordert von: **' + user.tag + '**').then
                        setTimeout(() => reaction.message.channel.delete(), 60000)

                        const embedSuccess2 = new Discord.MessageEmbed()
                            .setTitle('Ein Ticket wurde per Reaktion gelöscht')
                            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                            .addField(user.tag, ' in <#' + reaction.message.channel.name + '>')
                            .setFooter('thevalleyy-NetWork', iconurl)
                            .setTimestamp()
                            .setColor('03f8fc')
                        client.channels.cache.get(modlog).send({ embeds: [embedSuccess2] })
                    }

                } else { reaction.message.channel.send('Sorry ' + user.tag + ', diese Aktion kann nur von Mods / Admins ausgeführt werden.') }
            } else {
                return
            }
        } catch (error) {
            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -close')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            client.channels.cache.get(modlog).send({ embeds: [failEmbed] })

        }
    })
}