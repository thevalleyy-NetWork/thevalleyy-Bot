module.exports = {
    commands: ['test'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    callback: async(message, arguments, text) => {
        const Discord = require('discord.js')
        const Enmap = require('enmap')
        let Role = message.member.guild.roles.cache.find(role => role.name === 'Nice One').id
        return

    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}