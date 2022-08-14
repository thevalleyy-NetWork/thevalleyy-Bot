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
    cooldown: null,
    description: "Zeigt dir entweder dein oder ein anderes Profilbild",
    callback: async(message, arguments, text) => {

        if (!arguments[0]) {
            message.reply(message.author.avatarURL({ size: 4096 }))
        } else {
                let avatarkek = getMember(message, arguments[0])
                if (!avatarkek) return message.reply(`\`${arguments[0].substring(0, 50)}\` ist kein gültiger Nutzer!`)
            message.reply(avatarkek.user.avatarURL({ size: 4096 })).catch((error) => {
                message.reply('Es gab einen Fehler: `' + error.substring(0, 500) + '`')
            })
        }

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}