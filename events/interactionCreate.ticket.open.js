function time() {
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

return datetime
}

const modlog = '822575095721099304'
const Discord = require('discord.js')
const config = require('./../config.json')

module.exports = (client, interaction) => {
        if (interaction.customId !== "TICKET_create") return;
        if (interaction.user.bot) return

        // user wants to open a ticket
        const server = interaction.guild
        const ticketName = '🎫-' + interaction.user.username.toLowerCase()

        try{
            const firstTicket = server.channels.cache.find(c => c.name.toLowerCase() === ticketName)
        if (firstTicket) return interaction.reply({ content: "Du hast bereits ein offenes Ticket, <#" + firstTicket.id + ">", ephemeral: true })


        const suprole = interaction.guild.roles.cache.find(role => role.name === 'Supporter')
        const modrole = interaction.guild.roles.cache.find(role => role.name === 'Moderator')


        // ticket can be created
        const category = server.channels.cache.find(c => c.name === 'Tickets')
        server.channels.create({name: ticketName, topic: ('Created at: ' + time() + ' by ' + interaction.user.tag + ' (' + interaction.user.id + ')'), position: 0, parent: category}).then(channel => {
                    channel.permissionOverwrites.edit(interaction.user.id, {
                        UseExternalEmojis: true,
                        ViewChannel: true,
                        SendMessages: true,
                        ReadMessageHistory: true,
                        AttachFiles: true,
                        EmbedLinks: true,
                        AddReactions: true
                    })

                    channel.permissionOverwrites.edit(server.id, {
                        ViewChannel: false
                    })

                    channel.permissionOverwrites.edit(modrole.id, {
                        ViewChannel: true,
                        SendMessages: true,
                        ReadMessageHistory: true,
                        AttachFiles: true,
                        EmbedLinks: true,
                        SendTTSMessages: true,
                        ManageMessages: true,
                        UseExternalEmojis: true,
                        ManageChannels: true,
                        AddReactions: true
                    })

                    channel.permissionOverwrites.edit(suprole.id, {
                        ViewChannel: true,
                        SendMessages: true,
                        ReadMessageHistory: true,
                        AttachFiles: true,
                        EmbedLinks: true,
                        UseExternalEmojis: true,
                        AddReactions: true
                    })


                    interaction.reply({ content: "Dein Ticket wurde in <#" + channel.id + "> erstellt!", ephemeral: true })

                    const embed = new Discord.EmbedBuilder()
                    .setTitle("Heyho, " + interaction.user.username + ", \nHerzlich Willkommen im Support")
                    .setDescription("Hier helfen dir die <@&" + suprole + "> und \n<@&" + modrole + ">en bei deinen Anliegen. \nDa wir aber keine Maschinen sind, kann es \nmanchmal ein bisschen dauern, bis du eine \nRückmeldung bekommst.")
                    .setColor("#8319E6")
                    .setFooter({text: interaction.guild.name, iconURL: server.iconURL()})
                    .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/15/34/ticket-150090_960_720.png")
                    .setAuthor({name: "Support-Ticket", iconURL: interaction.user.avatarURL()})
                    .addFields([
                        {name: "Bitte halte dich an die Regeln und akzeptiere Entscheidungen des Teams.", value: `**Mit \`\`${config.prefix}close\`\` kannst du das Ticket schließen.**`}
                    ])

                    channel.send({ embeds: [embed] }).then(message => {
                        message.pin()
                    })

                    const embedLog = new Discord.EmbedBuilder()
                        .setTitle('Ein Ticket wurde erstellt')
                        .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                        .addFields([{ name: interaction.user.tag, value: ' in <#' + channel.id + '>'}])
                        .setFooter({text: interaction.guild.name, iconURL: server.iconURL()})
                        .setTimestamp()
                        .setColor('#03f8fc')
                    client.channels.cache.get(modlog).send({ embeds: [embedLog] })
                })
            

    } catch (err) {
        console.log(err)
    }
}