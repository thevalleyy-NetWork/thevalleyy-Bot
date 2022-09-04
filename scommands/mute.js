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
            .setName('duration')
			.setDescription('Wie lange soll der User gemuted werden?')
            .setRequired(true)
            .setDescriptionLocalizations({
                "en-US": 'How long shall the user be muted?',
                "en-GB": 'How long shall the user be muted?'
            })
            .addChoices(
                { name: 'Permanent', value: '0' },
                { name: '1 Minute', value: '1' },
                { name: '5 Minuten', value: '5' },
                { name: '10 Minuten', value: '10' },
                { name: '30 Minuten', value: '30' },
                { name: '1 Stunde', value: '60' },
                { name: '2 Stunden', value: '120' },
                { name: '4 Stunden', value: '240' },
                { name: '12 Stunden', value: '720' },
                { name: '1 Tag', value: '1440' },
                { name: '2 Tage', value: '2880' },
                { name: '1 Woche', value: '10080' },
                { name: '2 Wochen', value: '20160' },
                { name: '1 Monat', value: '40320' }
            )

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