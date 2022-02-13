module.exports = {
    commands: ['status'],
    expectedArgs: '[type] <text>',
    permissionError: 'Neeeeeeeeeeeeeee',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text) => {

        const botlog = '822575095721099304'
        var iconurl = message.guild.iconURL({ dynamic: true })
        const Discord = require('discord.js')
        const supRole = message.member.guild.roles.cache.find(role => role.name === 'Supporter').id

        if (message.author.id == '428487848304574466' || message.guild.members.cache.get(message.author.id).roles.cache.has(supRole)) {

            if (!arguments[1]) {

                if (arguments[0].toLowerCase() === 'live' || arguments[0].toLowerCase() === 'streaming') {
                    message.reply("Um `" + arguments[0] + "` verwenden zu können, muss ein Text angegeben werden.")
                    return
                } else message.reply("Versuche, den Status zu `" + arguments[0].toLowerCase() + "` zu ändern.")

                try { message.client.user.setPresence({ activities: [{ name: '' }], status: arguments[0].toLowerCase() }) } catch (error) {
                    const embedfail = new Discord.MessageEmbed()
                        .setTitle('Es gab einen Fehler bei -status')
                        .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                        .setDescription('Fehler: `' + error + '`')
                        .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                        .setFooter('thevalleyy-NetWork', iconurl)
                        .setTimestamp()
                        .setColor('fc036b')
                    message.client.channels.cache.get(botlog).send({ embeds: [embedfail] })
                }


            } else {
                const stext = text.split(' ').slice(1).join(' ')

                if (arguments[0].toLowerCase() === 'live' || arguments[0].toLowerCase() === 'streaming') {
                    message.client.user.setActivity(stext, { type: 'STREAMING', url: 'https://twitch.tv/thevalleyy' })
                    message.reply("Versuche, den Status zu `" + arguments[0].toLowerCase() + "`, `" + stext + "` zu ändern.")
                    return
                }

                message.reply("Versuche, den Status zu `" + arguments[0].toLowerCase() + "`, `" + stext + "` zu ändern.")
                try { message.client.user.setPresence({ activities: [{ name: stext }], status: arguments[0].toLowerCase() }) } catch (error) {
                    const embedfail = new Discord.MessageEmbed()
                        .setTitle('Es gab einen Fehler bei -status')
                        .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                        .setDescription('Fehler: `' + error + '`')
                        .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                        .setFooter('thevalleyy-NetWork', iconurl)
                        .setTimestamp()
                        .setColor('fc036b')
                    message.client.channels.cache.get(botlog).send({ embeds: [embedfail] })
                }
            }
        } else {
            message.react("<:hm:907936051300012072>")
        }

    },
    permissions: [],
    requiredRoles: ['Nice One']
}