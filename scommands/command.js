const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
	.setName('command')
    .setDMPermission(false)
	.setDescription('Gibt Infos über einen Befehl aus.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Get info about a command',
        "en-GB": 'Get info about a command'
	})
	.addStringOption(option =>
		option
            .setName('command')
			.setDescription('Der Name des Befehls')
            .setDescriptionLocalizations({
                "en-US": 'Name of the command',
                "en-GB": 'Name of the command'
            })
	)
}