const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     

    const iconurl = interaction.guild.iconURL()
    const suprole = interaction.guild.roles.cache.find(role => role.name === 'Supporter')
    const modrole = interaction.guild.roles.cache.find(role => role.name === 'Moderator')
    const ticketId = interaction.channel.topic.replace('(', '').replace(')', '').split(' ').slice(9).join(' ')

        
        if (!interaction.channel.name.startsWith('🎫-')) return interaction.reply("Dieser Kanal ist kein geöffnetes Ticket.")
        if (ticketId == interaction.user.id || interaction.member.roles.cache.has(suprole.id) || interaction.member.roles.cache.has(modrole.id)) {
   
        const category = interaction.guild.channels.cache.find(c => c.name === 'Tickets')

        try {
            interaction.channel.permissionOverwrites.edit(ticketId, {
                ViewChannel: false
            })

            interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
                ViewChannel: false
            })

            interaction.channel.setName(interaction.channel.name.replace('🎫', '🔒'))
            interaction.channel.setPosition(category.children.cache.size - 1)


            const embed = new Discord.EmbedBuilder()
            .setTitle("Wie soll nun verfahren werden?")
            .setDescription("Ticket archivieren?")
            .setColor("#8319e6")
            .setFooter({ text: interaction.guild.name, iconURL: iconurl })
            .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/15/34/ticket-150090_960_720.png")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
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


            interaction.reply({ embeds: [embed], components: [ticketButtons] })
        } catch (err) {
            //ERROR
            interaction.client.channels.cache.get(modlog).send("Gab nen Fehler bei -close: " + err)
        }
    } else {
        return interaction.reply("Du kannst nur dein eigenes Ticket schließen.")
    }

}