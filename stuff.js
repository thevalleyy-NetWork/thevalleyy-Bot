// template
module.exports = {
    commands: [''],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    cooldown: null,
    description: "this description is weird",
    callback: (message, arguments, text) => {

        const Discord = require('discord.js')
        var iconurl = message.guild.iconURL({
            dynamic: true
        })


        // Code here

        client.logChannel.send()
    },
    permissions: [],
    requiredRoles: ['Mitglied']
}

// getmember function
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