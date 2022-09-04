const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('mute')
    .setDMPermission(false)
	.setDescription('Entzieht einem User die Möglichkeit zu schreiben, sprechen, reagieren, etc.')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Mutes a user',
        "en-GB": 'Mutes a user'
	})
	.addUserOption(option =>
		option
            .setName('user')
			.setDescription('Nutzer, den du muten möchtest')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'User to mute',
                "en-GB": 'User to mute'
            })
	)

    .addStringOption(option =>
		option
            .setName('reason')
			.setDescription('Grund für den Mute')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'Reason for the mute',
                "en-GB": 'Reason for the mute'
            })
	)
}