module.exports = {
    commands: ['cooldown'],
    expectedArgs: '<alias>',
    permissionError: 'Hm.. Irgendwas ist schief gelaufen',
    minArgs: 1,
    maxArgs: 1,
    cooldown: 10000,
    description: "this description is weird",
    callback: (message, arguments, text) => {
        var iconurl = message.guild.iconURL({ dynamic: true })


    },
    permissions: [],
    requiredRoles: ['Nice One']
}