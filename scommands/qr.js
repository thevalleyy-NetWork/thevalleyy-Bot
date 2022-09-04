const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    cooldown: 30,
    data: new SlashCommandBuilder()
	.setName('qr')
    .setDMPermission(false)
	.setDescription('Generiert oder scannt einen QR-Code')
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
	.setDescriptionLocalizations({
		"en-US": 'Generates or scans a qr code',
        "en-GB": 'Generates or scans a qr code'
	})
    .addSubcommand(subcommand =>
        subcommand
            .setName('generate')
            .setDescription('Generiert einen QR-Code')
            .setDescriptionLocalizations({
                "en-US": 'Generates a qr code',
                "en-GB": 'Generates a qr code'
            })
            .addStringOption(option => 
                option
                .setName('data')
                .setRequired(true)
                .setDescription('Der Text oder URL, der / die in den QR-Code geschrieben werden soll')
                .setDescriptionLocalizations({
                    "en-US": 'The text or URL that should be written in the QR code',
                    "en-GB": 'The text or URL that should be written in the QR code'
                })
            ))

            .addSubcommand(subcommand =>
                subcommand
                    .setName('scan')
                    .setDescription('Scannt einen QR-Code')
                    .setDescriptionLocalizations({
                        "en-US": 'Scans a qr code',
                        "en-GB": 'Scans a qr code'
                    })
                    .addAttachmentOption(option => 
                        option
                        .setName('qrcode')
                        .setRequired(true)
                        .setDescription('Der QR-Code, der gescannt werden soll')	
                        .setDescriptionLocalizations({
                            "en-US": 'The qr code that should be scanned',
                            "en-GB": 'The qr code that should be scanned'
                        })
                    ))
}