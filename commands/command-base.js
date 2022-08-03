const config = require('./../config.json')
const Discord = require('discord.js')
const { ChannelType } = require('discord.js')
const cooldownSet = new Set()
const mysql = require('mysql')
const util = require('util')
const fs = require('fs')
const path = require('path')

var connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)

//delete files in directory
const directory = './data/cmdinfo/';

fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
        });
    }
});

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

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
//        permissionError = '',
        minArgs = 0,
        maxArgs = null,
        cooldown = null,
        description = 'Well, this is a description... What did you expect?',
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    //const cmdpattern = `{\n"commands": ${[commands]},\n"cooldown": ${(cooldown)},\n"description": "${description.toString()}",\n"expectedArgs": "${expectedArgs.toString()}",\n"maxArgs": ${(maxArgs)},\n"minArgs": ${(minArgs)},\n"permissionError": "${permissionError.toString()}",\n"permissions": ${[permissions]},\n"requiredRoles": ${requiredRoles.toString()}\n},\n`
    const cmdpattern = `${JSON.stringify(commandOptions, null, 2)}`


    //create a file for every new command
    setTimeout(() => {
        fs.writeFile(`./data/cmdinfo/@${commands.toString().replaceAll(",",";")}.json`, cmdpattern, function(err) {
            if (err) console.log(err)
        });

    }, 1000)


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
    client.on('messageCreate', async message => {

        const { member, content, guild } = message

        // Ensure this message is sent by a user on a server
        if (message.guild === null) return
        if (message.author.bot) return
        if (!message.guild.available) return
        if (message.channel.type == ChannelType.DM) return
        if (message.webhookId) return

        for (const alias of commands) {
            if (content.toLowerCase() === (`${config.prefix}${alias.toLowerCase()}`) || content.toLowerCase().startsWith(`${config.prefix}${alias.toLowerCase()} `)) {

                // A command has been ran

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

                        var hDisplay = h > 0 ? (h == 1 ? m > 0 ? `einer Stunde, ` : h == 1 ? `einer Stunde` : `${h} Stunden` : `${h} Stunden, `) : ``;
                        var mDisplay = m > 0 ? (m == 1 ? s > 0 ? `einer Minute, ` : m == 1 ? `einer Minute` : `${m} Minuten` : `${m} Minuten, `) : ``;
                        var sDisplay = s > 0 ? (s == 1 ? `einer Sekunde` : `${s} Sekunden`) : ``;

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



                // Ensure the user has the required permissions
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


                // Handle the custom command code
                message.guild.members.fetch()
                callback(message, arguments, arguments.join(' '))

                if (message.guild.id !== "631518992342843392") return
                const executed = new Discord.EmbedBuilder()
                    .setTitle('registered a command')
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
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
                        iconURL: message.guild.iconURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setColor(config.cmd_log_color)
                if (arguments.length) executed.addFields([{ name: 'arguments:', value: `\`${arguments.join(' ').substring(0, 1000)}\`${(arguments.toString().length > 1000 ? "..." : "")}`, inline: false}])
            
                message.client.channels.cache.get(config.cmd_log_channel_id).send({ embeds: [executed] })
                return
                    // TODO: button für "lyrics: song" und interpreten + album klickbar
            }
        }
    })
}