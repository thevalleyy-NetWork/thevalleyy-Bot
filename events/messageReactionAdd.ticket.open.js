const modlog = '822575095721099304'
const Discord = require('discord.js')

module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL()

    client.on('messageReactionAdd', async(reaction, user) => {
        if (reaction.message.id !== '843060299288412190') return
        if (user == client.user) return
        if (user.bot) return

        var server = reaction.message.guild
        var suprole = '786247278654259270'
        var modrole = '726146482314674197'
        var date = new Date()
        var date = new Date()

        let secFiller = ""
        let minFiller = ""
        let hourFiller = ""
        let dayFiller = ""
        let monthFiller = ""

        if (date.getSeconds().toString().length < 2) secFiller = "0"
        if (date.getMinutes().toString().length < 2) minFiller = "0"
        if (date.getHours().toString().length < 2) hourFiller = "0"
        if (date.getDate().toString().length < 2) dayFiller = "0"
        if (date.getMonth().toString().length < 2) monthFiller = "0"

        var datetime =
            dayFiller + date.getDate() + ". " +
            monthFiller + (date.getMonth() + 1) + ". " +
            date.getFullYear() + " | " +
            hourFiller + date.getHours() + ":" +
            minFiller + date.getMinutes() + ":" +
            secFiller + date.getSeconds()


        try {
            let ticketname = '🎫-' + user.username.toLowerCase()
            if (server.channels.cache.find(c => c.name.toLowerCase() === ticketname)) {
                reaction.message.channel.send('Nope, du hast schon ein offenes Ticket, **' + user.username + '**').then(message => {
                    setTimeout(() => message.delete(), 3000)
                })

                client.channels.cache.get(modlog).send('`' + user.tag + ' wollte ein 2. Ticket erstellen`')
            } else {
                reaction.users.remove(user.id)
                server.channels.create('🎫-' + user.username).then(channel => {
                    channel.setParent('843062833986011177')
                    channel.setTopic('Created at: ' + datetime + ' by ' + user.tag + ' (' + user.id + ')')
                    channel.setPosition(0)
                    channel.permissionOverwrites.edit(user.id, {
                        CREATE_INSTANT_INVITE: false,
                        USE_EXTERNAL_EMOJIS: true,
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        READ_MESSAGE_HISTORY: true,
                        ATTACH_FILES: true,
                        EMBED_LINKS: true,
                        ADD_REACTIONS: true
                    })

                    channel.permissionOverwrites.edit(server.id, {
                        VIEW_CHANNEL: false
                    })

                    channel.permissionOverwrites.edit(modrole, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        READ_MESSAGE_HISTORY: true,
                        ATTACH_FILES: true,
                        EMBED_LINKS: true,
                        SEND_TTS_MESSAGES: true,
                        MANAGE_MESSAGES: true,
                        USE_EXTERNAL_EMOJIS: true,
                        MANAGE_CHANNELS: true,
                        ADD_REACTIONS: true
                    })

                    channel.permissionOverwrites.edit(suprole, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        READ_MESSAGE_HISTORY: true,
                        ATTACH_FILES: true,
                        EMBED_LINKS: true,
                        USE_EXTERNAL_EMOJIS: true,
                        ADD_REACTIONS: true
                    })

                    const embedMessage = {
                        "title": 'Heyho ' + user.username + ', \nHerzlich Willkommen im Support',
                        "description": "Hier helfen dir die <@&" + suprole + "> und \n<@&" + modrole + ">en bei deinen Anliegen. \nDa wir aber keine Maschinen sind, kann es \nmanchmal ein bisschen dauern, bis du eine \nRückmeldung bekommst.",
                        "color": '8319e6',
                        "footer": {
                            "icon_url": server.iconURL(),
                            "text": "thevalleyy-NetWork"
                        },
                        "thumbnail": {
                            "url": "https://cdn.pixabay.com/photo/2013/07/12/15/34/ticket-150090_960_720.png"
                        },
                        "author": {
                            "name": "Support-Ticket",
                            "icon_url": user.avatarURL()
                        },
                        "fields": [{
                            "name": "\nBitte halte dich an die Regeln und akzeptiere Entscheidungen des Teams.",
                            "value": "**Mit ``-close`` kannst du das Ticket schließen.**"
                        }, ]
                    }
                    channel.send({ embeds: [embedMessage] }).then(message => {
                        message.pin()
                    })

                    const embedLog = new Discord.EmbedBuilder()
                        .setTitle('Ein Ticket wurde erstellt')
                        .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                        .addFields([{ name: user.tag, value: ' in <#' + channel.id + '>'}])
                        .setFooter('thevalleyy-NetWork', iconurl)
                        .setTimestamp()
                        .setColor('03f8fc')
                    client.channels.cache.get(modlog).send({ embeds: [embedLog] })
                })
            }

        } catch (error) {
            const embedFail = new Discord.EmbedBuilder()
                .setTitle('Es gab einen Fehler bei einem Ticket')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            client.channels.cache.get(modlog).send({ embeds: [embedFail] })
        }
    })
}