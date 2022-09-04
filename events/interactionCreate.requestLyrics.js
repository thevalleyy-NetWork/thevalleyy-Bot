const Discord = require('discord.js')

module.exports = (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "SPOTIFY_lyrics") return;

    const message = interaction.message
    const arguments = message.embeds[0].fields[0].value.replaceAll("`", "").split(" ")
    
    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId(message.components[0].components[0].data.custom_id)
                .setLabel(message.components[0].components[0].data.label)
                .setStyle(message.components[0].components[0].data.style)
                .setDisabled(true)

        )

    
    require("../commands/lyrics.js").callback(message, arguments, arguments.join(' '))

    interaction.update({ embeds: [message.embeds[0]], components: [row] })

}