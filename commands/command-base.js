const { prefix } = require('../config.json')
const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS_AND_STICKERS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission))
            throw new Error(`Unknown permission node "${permission}"`)
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'Unzureichende Berechtigungen',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }


    // Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    // Listen for messages
    client.on('messageCreate', message => {
        const { member, content, guild } = message

        // Ensure this message is sent by a user on a server
        if (message.guild === null) return
        if (message.author.bot) return
        if (!message.guild.available) return
        if (message.channel.type == "DM") return
        if (message.webhookId) return

        for (const alias of commands) {
            if (content.toLowerCase() === (`${prefix}${alias.toLowerCase()}`) || content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()} `)) {

                // A command has been ran

                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if (!member.permissions.has(permission)) {
                        message.reply(permissionError + ', ' + message.author.username)
                        return
                    }
                }

                // Ensure the user has the required roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(`Du musst mindestens die Rolle **${requiredRole}** haben, um diesen Befehl nutzen zu können.`)
                        return
                    }
                }

                // Split on any number of spaces
                const arguments = content.split(/[ ]+/)

                // Remove the command which is the first index
                arguments.shift()

                // Ensure we have the correct number of arguments
                if (arguments.length < minArgs | (maxArgs !== null && arguments.length > maxArgs)) {
                    message.reply('Falsche Syntax! Benutze: ``' + `${prefix}${alias} ${expectedArgs}` + '``')
                    return
                }


                // Handle the custom command code
                message.guild.members.fetch()
                callback(message, arguments, arguments.join(' '))
                    // []

                return
            }
        }
    })
}