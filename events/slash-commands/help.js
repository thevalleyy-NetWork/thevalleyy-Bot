const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     

    interaction.reply("Sorry, aber tali ist einfach zu faul mal ne hilfe zu adden")
    //TODO: automatisieren, help crasht

}