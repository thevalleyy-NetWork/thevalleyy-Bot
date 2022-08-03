module.exports = {
    commands: ['servers', 'serverlist'],
    expectedArgs: '',
    permissionError: 'ja ja ja',
    minArgs: 0,
    maxArgs: null,
    cooldown: 10000,
    description: "this description is weird",
    callback: (message, arguments, text) => {


        message.delete()
        message.client.guilds.cache.forEach((guild) => {
            message.channel.send("Server: `" + `${guild.name}` + "`, Accounts: `" + `${guild.memberCount}` + "`")
        })

    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}