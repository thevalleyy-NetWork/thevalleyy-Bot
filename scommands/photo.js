const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js'); //TODO: hier mehr optionen hinzufügen

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
	.setName('photo')
    .setDMPermission(false)
	.setDescription('Sucht nach Fotos im Internet.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Searches the internet for photos',
        "en-GB": 'Searches the internet for photos'
	})
	.addStringOption(option =>
		option
            .setName('query')
			.setDescription('Suchanfrage')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'Search query',
                "en-GB": 'Search query'
            })
	)
}
