function getMember(message, toFind = '') {
    toFind = toFind.toLowerCase()
    let target = message.guild.members.cache.get(toFind)

    if (!target && message.mentions.members)
        target = message.mentions.members.first()

    if (!target && toFind) {
        target = message.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind)
        })
    }

    if (!target) return
    return target
}

module.exports = {
    commands: ['spotify'],
    expectedArgs: '[user]',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 1,
    callback: async(message, arguments, text) => {
        const Discord = require('discord.js')

        if (!arguments[0]) {
            message.client.users.fetch(message.author.id, false)
                // await message.reply(message.author.presence.game.details)
            await console.log(message.author.presence)
        } else {
            getMember(message)
            let avatarkek = getMember(message, arguments[0])
            if (!avatarkek) {
                message.reply('kein user gefunden')
                return
            }
            message.reply(avatarkek.user.username)
        }

    },
    permissions: [],
    requiredRoles: ['Nice One']
}