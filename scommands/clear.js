const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    cooldown: 20,
    data: new SlashCommandBuilder()
	.setName('clear')
    .setDMPermission(false)
	.setDescription('Löscht die angegebene Anzahl an Nachrichten.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Deletes the given amount of messages.',
        "en-GB": 'Deletes the given amount of messages.'
	})
	.addNumberOption(option =>
		option
            .setName('number')
			.setDescription('Anzahl der Nachrichten, die gelöscht werden sollen')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'Amount of messages to be deleted',
                "en-GB": 'Amount of messages to be deleted'
            })
	)
}
