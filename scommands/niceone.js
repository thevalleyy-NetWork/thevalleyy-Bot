const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('niceone')
    .setDMPermission(false)
	.setDescription('Toggelt die Nice One Rolle eines Users')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Toggles the Nice One role of a user',
        "en-GB": 'Toggles the Nice One role of a user'
	})
	.addUserOption(option =>
		option
            .setName('user')
			.setDescription('Nutzer')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'User',
                "en-GB": 'User'
            })
	)
}