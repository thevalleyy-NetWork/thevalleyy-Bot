const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    interaction.reply("Sorry, aber tali ist einfach zu faul mal ne hilfe zu adden")
    //TODO: automatisieren, help crasht

}