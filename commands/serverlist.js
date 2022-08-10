module.exports = {
    commands: ['serverlist', 'servers'],
    expectedArgs: '',
    permissionError: 'ja ja ja',
    minArgs: 0,
    maxArgs: null,
    cooldown: 10000,
    description: "Listet alle Server auf, auf denen der Bot ist",
    callback: (message, arguments, text) => {


        message.delete()
        message.client.guilds.cache.forEach((guild) => {
            message.channel.send("Server: `" + `${guild.name}` + "`, Accounts: `" + `${guild.memberCount}` + "`")
        })

    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}