const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    interaction.reply("Soon")

}