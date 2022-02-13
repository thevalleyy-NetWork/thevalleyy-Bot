module.exports = {
    commands: ['mc', 'minecraft'],
    expectedArgs: '[IP] [Port]',
    permissionError: '',
    minArgs: 0,
    maxArgs: 2,
    callback: (message, arguments, text) => {

        var iconurl = message.guild.iconURL({
            dynamic: true
        })
        const fs = require('fs')
        const util = require('minecraft-server-util')
        const Discord = require('discord.js')
        const playerCount = fs.readFileSync('/home/container/data/playerrec.json', 'utf8');
        const playerCount_ = JSON.parse(playerCount)
        const botlog = '822575095721099304'


        try {
            util.status('node2.chaosbothosting.de', {
                port: 25504
            }).then(async(response) => {
                const embedSuccess = new Discord.MessageEmbed()
                    .setTitle("thevalleyy-NetWork")
                    .setFooter("thevalleyy NetWork", iconurl)
                    .setDescription("IP: thevalleyy.tk")
                    .setColor("#16f491")
                    .setThumbnail("https://eu.mc-api.net/v3/server/favicon/thevalleyy.tk")
                    .addField("Spieler:", `(${response.onlinePlayers}/${response.maxPlayers})`, true)
                    .addField("Spielerrekord:", playerCount_.mostPlayers, true)
                    .addField("Erreicht am:", playerCount_.date, true)
                    .addField("Letzter Ping:", playerCount_.lastPinged, true)
                    .addField("Version:", response.version, true)

                message.reply({ embeds: [embedSuccess] })

                const embedLog = new Discord.MessageEmbed()
                    .setTitle('-mc ausgeführt')
                    .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                    .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('03f8fc')
                message.client.channels.cache.get(botlog).send({ embeds: [embedLog] })
            })
        } catch (error) {
            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -mc')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(botlog).send({ embed: failEmbed })
            message.reply("Es gab einen Fehler...")

        }
    },
    permissions: [],
    requiredRoles: ['Nice One']
}