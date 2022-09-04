const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('tp')
    .setDMPermission(false)
	.setDescription('Infos zum thevalleyy-Texturepack')
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Info about the thevalleyy texturepack',
        "en-GB": 'Info about the thevalleyy texturepack'
	})
}