// cmd template
const Discord = require('discord.js')

module.exports = {
    commands: [''],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    cooldown: null,
    description: "This is a template for a command",
    callback: (message, arguments, text) => {

        const iconurl = message.guild.iconURL()


        // Code here

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

// event template (in this case MessageCreate)
module.exports = (client, message) => {
    // code here
}