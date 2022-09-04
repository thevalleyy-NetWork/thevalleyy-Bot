const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 60,
    data: new SlashCommandBuilder()
	.setName('help')
    .setDMPermission(false)
	.setDescription('Hilfe-Menü')
	.setDescriptionLocalizations({
		"en-US": 'Displays the help menu for this bot',
        "en-GB": 'Displays the help menu for this bot'
	})
}