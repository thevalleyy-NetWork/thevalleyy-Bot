module.exports = {
    commands: ['close'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    cooldown: 300000,
    description: "Schließt dein offenes Ticket",
    callback: (message, arguments, text) => {

        const iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const Discord = require('discord.js')

        const ticketId = message.channel.topic.replace('(', '').replace(')', '').split(' ').slice(9).join(' ')
        if (!message.channel.name.startsWith('🎫-')) return message.reply("Dieser Kanal ist kein geöffnetes Ticket.")
        if (ticketId != message.author.id) return message.reply("Du kannst nur dein eigenes Ticket schließen.")
        // permission für mods, sups und admins

        try {
            message.channel.permissionOverwrites.edit(ticketId, {
                ViewChannel: false
            })

            message.channel.permissionOverwrites.edit(message.guild.id, {
                ViewChannel: false
            })

            message.channel.setName(message.channel.name.replace('🎫', '🔒'))
            message.channel.setPosition(0)


            const embed = new Discord.EmbedBuilder()
            .setTitle("Wie soll nun verfahren werden?")
            .setDescription("Ticket archivieren?")
            .setColor("#8319e6")
            .setFooter({ text: message.guild.name, iconURL: iconurl })
            .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/15/34/ticket-150090_960_720.png")
            .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({ dynamic: true }) })
            .addFields([
                { name: "Ticket archivieren?", value: "<@&631521181752885268> oder <@&726146482314674197>", inline: true },
                { name: "<:checkmarkEmbed:1005146896278503597> - Ja  |  <:crossEmbed:1005146898451140749> - Nein", value: "Drücke einen der Buttons", inline: true}
            ])

            const buttonArchive = new Discord.ButtonBuilder()
            .setCustomId("TICKET_archive")
            .setEmoji("<:checkmarkButton:1005146895045373992> ")
            .setStyle("Secondary")

            const buttonDelete = new Discord.ButtonBuilder()
            .setCustomId("TICKET_delete")
            .setEmoji("<:crossButton:1005146897373216908>")
            .setStyle("Secondary")

            const ticketButtons = new Discord.ActionRowBuilder().addComponents(buttonArchive, buttonDelete)


            message.channel.send({ embeds: [embed], components: [ticketButtons] }).then(msg => {
                msg.pin
            })

        } catch (err) {
            message.client.channels.cache.get(modlog).send("Gab nen Fehler bei -close: " + err)
        }
    },
    permissions: [],
    requiredRoles: ['Mitglied']
}