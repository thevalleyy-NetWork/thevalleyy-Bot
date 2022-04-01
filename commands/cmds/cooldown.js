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


        module.exports = (client, commandOptions) => {
            let {
                commands,
                expectedArgs = '',
                permissionError = 'Unzureichende Berechtigungen',
                minArgs = 0,
                maxArgs = null,
                cooldown = null,
                description = 'Well, this is a description... What did you expect?',
                permissions = [],
                requiredRoles = [],
                callback
            } = commandOptions

            for (const alias of commands) {
                console.log(alias)
            }
        }


    },
    permissions: [],
    requiredRoles: ['Nice One']
}