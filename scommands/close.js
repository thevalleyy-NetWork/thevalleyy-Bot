const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('close')
    .setDMPermission(false)
	.setDescription('Schließt ein geöffnetes Ticket')
	.setDescriptionLocalizations({
		"en-US": 'Closes an open ticket',
        "en-GB": 'Closes an open ticket'
	})
}