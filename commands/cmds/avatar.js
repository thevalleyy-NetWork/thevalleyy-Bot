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
    commands: ['avatar'],
    expectedArgs: '<name>',
    permissionError: 'ne',
    minArgs: 0,
    maxArgs: null,
    callback: async(message, arguments, text) => {

        if (!arguments[0]) {
            message.reply(message.author.avatarURL({ dynamic: true, size: 128 }))
        } else {
            getMember(message)
            let avatarkek = getMember(message, arguments[0])
            if (!avatarkek) {
                message.reply('Der User `' + arguments[0].substring(0, 50) + '` konnte nicht gefunden werden.')
                return
            }
            message.reply(avatarkek.user.avatarURL({ dynamic: true, size: 128 })).catch((error) => {
                message.reply('Es gab einen Fehler: `' + error.substring(0, 500) + '`')
            })
        }

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}