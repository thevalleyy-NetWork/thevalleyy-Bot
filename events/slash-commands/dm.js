const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const user = interaction.options.get("user")
    const text = interaction.options.getString("content")

        if (user.user.id == config.owner || user.user.id == client.user.id) {
            interaction.channel.send('DMs an `' + user.user.username + '` sind nicht erlaubt.')
            return
        }

        try {
            await user.user.send(text.substring(0, 2000))
            interaction.channel.send('Die Nachricht wurde an `' + user.user.tag + '` versandt.')

        } catch (error) {
            //ERROR
            interaction.reply('Die Nachricht konnte nicht an `' + user.user.tag + '` versendet werden.')
        }

}