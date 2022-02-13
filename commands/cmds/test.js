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
        let hasRole = undefined

        // user has role?
        if (message.member.roles.cache.has(Role)) {
            hasRole = true
        } else {
            hasRole = false
        }

        // creating the enmap
        const someEnmap = new Enmap({
            name: 'notNiceOnes',
            autoFetch: true,
            fetchAll: false
        })
        if (someEnmap.get(message.author.id) === undefined) {
            someEnmap.set(message.author.id, hasRole)
        } else {
            message.reply("Du bist bereits in der Datenbank registriert.")
        }

    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}