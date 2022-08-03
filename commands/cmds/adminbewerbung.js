const Discord = require('discord.js');
const config = require('./../../config.json')
module.exports = {
    commands: ['adminbewerbung'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    description: "this description is weird",
    callback: (message, arguments, text) => {

        const embed = new Discord.EmbedBuilder()
            .setTitle("Admin-Bewerbung")
            .setColor(config.standard_color)
            .setDescription("[Bitte sende hier deine Bewerbung ein und wir werden sie schnellstmöglich bearbeiten.](https://tinyurl.com/bdz4kpd5)")

        message.reply({embeds: [embed]})

    },
    permissions: [],
    requiredRoles: ['Nice One']
}