module.exports = {
    commands: ['servers', 'serverlist'],
    expectedArgs: '',
    permissionError: 'joa joa joa',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {


        message.delete()
        message.client.guilds.cache.forEach((guild) => {
            message.channel.send("Server: `" + `${guild.name}` + "`, Accounts: `" + `${guild.memberCount}`)
        })

    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}