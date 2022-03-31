module.exports = {
    commands: ['test', 'test2'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    cooldown: 0,
    description: "this description is weird",
    callback: async(message, arguments, text) => {
        const Discord = require('discord.js')

        message.reply("Test erfolgreich!")

    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}