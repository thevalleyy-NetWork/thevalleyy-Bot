const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('kick')
    .setDMPermission(false)
	.setDescription('Kickt einen User')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Kicks a user',
        "en-GB": 'Kicks a user'
	})
	.addUserOption(option =>
		option
            .setName('user')
			.setDescription('User den du kicken willst')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'User to kick',
                "en-GB": 'User to kick'
            })
	)

    .addStringOption(option =>
		option
            .setName('reason')
			.setDescription('Grund für den Kick')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'Kick reason',
                "en-GB": 'Kick reason'
            })
	)
}