const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     
    if (interaction.user.id != config.owner) {
        interaction.reply({content: 'Du hast keine Berechtigung, diesen Befehl auszuführen.', ephemeral: true})
        return;
    }

    var text = "```json\n{\n"
    client.guilds.cache.forEach((guild) => {
        text += `    "${guild.name} (${guild.id})": "${guild.memberCount}",\n`
    })

    text += "}```"
    interaction.reply({content: text.substring(0, 2000), ephemeral: true})

}