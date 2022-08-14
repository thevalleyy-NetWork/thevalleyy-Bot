const cmdJson = require("../data/CMDoptions.json")
const config = require("../config.json")
const Discord = require('discord.js')

const cooldownSet = new Set()
const mysql = require('mysql')
const util = require('util')

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)

const validatePermissions = (permissions) => {
    const validPermissions = [
        "AddReactions",
        "Administrator",
        "AttachFiles",
        "BanMembers",
        "ChangeNickname",
        "Connect",
        "CreateInstantInvite",
        "CreatePrivateThreads",
        "CreatePublicThreads",
        "DeafenMembers",
        "EmbedLinks",
        "KickMembers",
        "ManageChannels",
        "ManageEmojisAndStickers",
        "ManageEvents",
        "ManageGuild",
        "ManageMessages",
        "ManageNicknames",
        "ManageRoles",
        "ManageThreads",
        "ManageWebhooks",
        "MentionEveryone",
        "ModerateMembers",
        "MoveMembers",
        "MuteMembers",
        "PrioritySpeaker",
        "ReadMessageHistory",
        "RequestToSpeak",
        "SendMessages",
        "SendMessagesInThreads",
        "SendTTSMessages",
        "Speak",
        "Stream",
        "UseApplicationCommands",
        "UseEmbeddedActivities",
        "UseExternalEmojis",
        "UseExternalStickers",
        "UseVAD",
        "ViewAuditLog",
        "ViewChannel",
        "ViewGuildInsights"
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission))
            throw new Error(`Unknown permission node "${permission}"`)
    }
}


module.exports = async (client, message) => {
    const { member, content, guild } = message

    // Ensure this message is sent by a user on a server
    if (message.author.bot || message.guild === null || message.channel.type == Discord.ChannelType.DM) return
    
    // a message has been sent by a user
    Object.keys(cmdJson.cmds).forEach(commandFile => {
        if (typeof cmdJson.cmds[commandFile].commands === 'string') cmdJson.cmds[commandFile].commands = [cmdJson.cmds[commandFile].commands]
        cmdJson.cmds[commandFile].commands.forEach(async alias => {
            
            if (
                content.toLowerCase() === (`${config.prefix}${alias.toLowerCase()}`) || 
                content.toLowerCase().startsWith(`${config.prefix}${alias.toLowerCase()} `)) {


                // its a command
                let commands = cmdJson.cmds[commandFile].commands
                let expectedArgs = cmdJson.cmds[commandFile].expectedArgs
                let permissionError = cmdJson.cmds[commandFile].permissionError
                let minArgs = cmdJson.cmds[commandFile].minArgs
                let maxArgs = cmdJson.cmds[commandFile].maxArgs
                let cooldown = cmdJson.cmds[commandFile].cooldown
                let description = cmdJson.cmds[commandFile].description
                let permissions = cmdJson.cmds[commandFile].permissions
                let requiredRoles = cmdJson.cmds[commandFile].requiredRoles


                // Ensure the permissions are in an array and are all valid
                if (permissions.length) {
                    if (typeof permissions === 'string') {
                        permissions = [permissions]
                    }
            
                    validatePermissions(permissions)
                }

                if (message.author.id != config.owner) {
                    //Check if the user is blacklisted
                    try {
                        if (await db(`SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${message.author.id}`).then(res => res[0])) {
                            return
                        }
                    } catch (e) {
                        message.guild.channels.cache.get(config.mod_log_channel_id).send(`Die Blacklist konnte nicht erfolgreich abgefragt werden:\n${e}`)
                    }

                    
                    // Check if the command has a custom cooldown
                    if (cooldown === null) {

                        // No custom cooldown, use the default

                        // react and remove the message
                        if (cooldownSet.has(message.author.id)) {
                            message.react('⏳')
                            setTimeout(() => {
                                message.delete().catch(err => {})
                            }, 5000)
                            return
                        }

                        // add the user to the cooldown set
                        cooldownSet.add(message.author.id)
                        setTimeout(() => {
                            cooldownSet.delete(message.author.id)
                        }, config.cooldown_standard)

                    } else {
                        // the same as above, but with a custom cooldown
                        // calculate the cooldown
                        d = Number(cooldown / 1000);
                        var h = Math.floor(d / 3600);
                        var m = Math.floor(d % 3600 / 60);
                        var s = Math.floor(d % 3600 % 60);

                        var hDisplay = +h > 0 ? (+h == 1 ? +m > 0 ? `eine Stunde, ` : +h == 1 ? `eine Stunde` : `${h} Stunden` : +m > 0 ? `${h} Stunden, ` :`${h} Stunden`) : ``;
                        var mDisplay = +m > 0 ? (+m == 1 ? +s > 0 ? `eine Minute, ` : +m == 1 ? `eine Minute` : `${m} Minuten` : +s > 0 ? `${m} Minuten, ` : `${m} Minuten`) : ``;
                        var sDisplay = +s > 0 ? (+s == 1 ? `eine Sekunde` : `${s} Sekunden`) : ``;

                        // do the magic
                        if (cooldownSet.has(message.author.id + commands[0])) {
                            let msg = await message.reply(`\`${config.prefix + alias}\` hat einen Cooldown von \`${hDisplay + mDisplay + sDisplay}\``)
                            setTimeout(() => {
                                msg.delete().catch(err => {})
                            }, 3000)
                            setTimeout(() => {
                                message.delete().catch(err => {})
                            }, 5000)
                            return
                        }
                        cooldownSet.add(message.author.id + commands[0])
                        setTimeout(() => {
                            cooldownSet.delete(message.author.id + commands[0])
                        }, cooldown)
                    }
                }

                for (const permission of permissions) {
                    if (!member.permissions.has(permission)) {
                        message.reply(`Für \`${alias}\` benötigst du die Berechtigungen: \`${permissions.join(', ')}\``)
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
                    message.reply('Falsche Syntax! Benutze: ``' + `${config.prefix}${alias} ${expectedArgs}` + '``')
                    return
                }

                message.guild.members.fetch()


                require("../commands/" + commandFile).callback(message, arguments, arguments.join(' '))
                

                const executed = new Discord.EmbedBuilder()
                    .setTitle('registered a command')
                    .setThumbnail(message.author.avatarURL())
                    .setDescription(`\`${message.author.tag}\`, <@${message.author.id}>`)
                    .addFields([
                        { name: "command:", value: `\`${config.prefix}${alias}\``, inline: true},
                        { name: "channel:", value: '<#' + message.channel.id + '>', inline: true},
                        { name: "guild.id:", value: `\`${message.guild.id}\``, inline: true},
                        { name: "guild.name:", value: `\`${message.guild.name}\``, inline: true},
                        { name: "link:", value: `[${message.url}](${message.url} "link to ${message.author.username}'s message")`, inline: true}
                    ])
                    .setFooter({
                        text: message.guild.name,
                        iconURL: message.guild.iconURL()
                    })
                    .setTimestamp()
                    .setColor(config.cmd_log_color)
                if (arguments.length) executed.addFields([{ name: 'arguments:', value: `\`${arguments.join(' ').substring(0, 1000)}\`${(arguments.toString().length > 1000 ? "..." : "")}`, inline: false}])
            
                message.client.channels.cache.get(config.cmd_log_channel_id).send({ embeds: [executed] })
                return
            }
        }
    )}
)}