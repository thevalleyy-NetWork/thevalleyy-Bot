module.exports = {
    commands: ['texturepack', 'tp'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    description: "this description is weird",
    callback: (message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const Discord = require('discord.js')


        const embed = new Discord.EmbedBuilder()
            .setTitle('Abgerufen von: ' + message.author.username)
            .setDescription('Texturen für Minecraft. Von thevalleyy')
            .addFields([
                { name: 'Version:', value: 'Minecraft Java 1.17 | Version der TexturePacks: Beta_0.3'},
                { name: 'Download', value: 'https://drive.google.com/file/d/1qmDFRpdOqF4HecllwdYI2kWZ--1FU46w/view?usp=sharing'}
            ])
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: message.guild.name, iconURL: iconurl})
            .setTimestamp()
            .setAuthor({ name: 'Infos zum TexturePack von thevalleyy' })
            .setColor('#11dd9d')
        message.reply({ embeds: [embed] })


    },
    permissions: [],
    requiredRoles: ['Mitglied']
}