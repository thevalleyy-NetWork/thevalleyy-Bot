const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 300,
    data: new SlashCommandBuilder()
	.setName('allsky')
    .setDMPermission(false)
	.setDescription('✨Beobachte den Himmel✨ (fast live)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Watch the sky',
        "en-GB": 'Watch the sky'
	})

}