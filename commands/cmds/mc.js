const fs = require('fs')
const config = require('./../../config.json')
const util = require('minecraft-server-util')
const Discord = require('discord.js')
const modlog = '822575095721099304'

module.exports = {
    commands: ['mc', 'minecraft'],
    expectedArgs: '[IP] [Port]',
    permissionError: '',
    minArgs: 0,
    maxArgs: 2,
    cooldown: 10000,
    description: "this description is weird",
    callback: (message, arguments, text) => {

        if (!arguments[0] && !arguments[1]) {
            arguments[0] = "thevalleyy.tk"
            arguments[1] = ""
        }
        if (!arguments[1]) {
            arguments[1] = "25565"
        }

        util.status(arguments[0], parseInt(arguments[1])).catch(error => {

            const failEmbed = new Discord.EmbedBuilder()
                .setTitle('Es gab einen Fehler bei -mc')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addFields([{ name: message.author.tag, value: 'in <#' + message.channel.id + '>' }])
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
                .setColor('fc036b')

            message.client.channels.cache.get(modlog).send({ embeds: [failEmbed] })
        }).then(async(response) => {

            if (!response) return message.reply("Der Server ist nicht erreichbar.")

            const json = JSON.parse(fs.readFileSync("./data/playerrec.json", 'utf8'))
            const embed = new Discord.EmbedBuilder()
                .setTitle(arguments[0] + ":" + arguments[1])
                .setTimestamp()
                .setColor(config.standard_color)
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .addFields([
                    { name: "Spieler:", value: `(${response.players.online}/${response.players.max})`, inline: true},
                    { name: "Version:", value: `${response.version.name} (${response.version.protocol})`, inline: true},
                    { name: "Ping:", value: response.roundTripLatency.toString() + "ms", inline: true}
                ])

                .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + arguments[0] + ":" + arguments[1])
                .setImage(`http://status.mclive.eu/${arguments[0]}/${arguments[0]}/${arguments[1]}/banner.png`)


            if (arguments[0] == "thevalleyy.tk") {
                embed.addFields([
                    { name: "Spielerrekord:", value: json.mostPlayers.toString(), inline: true},
                    { name: "Erreicht am:", value: `<t:${json.date}:R>`, inline: true},
                    { name: "Letzter Ping:", value: `<t:${json.lastPinged}:R>`, inline: true},
                ])
            }
            embed.addFields([{ name: "​", value: `[${arguments[0]} auf NameMC](https://namemc.com/server/${arguments[0]}:${arguments[1]})`, inline: false}])

            await message.reply({ embeds: [embed] })

        })
    },
    permissions: [],
    requiredRoles: ['Nice One']
}