const botlog = '822575095721099304'
const mcc = '786266120381399042'
const Discord = require('discord.js')
const util = require('minecraft-server-util')
const fs = require('fs');

module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL()

    try {
        setInterval(function() {
            util.status('node2.chaosbothosting.de', {
                port: 25504
            }).then(async(response) => {
                var date = new Date()

                let secFiller = ""
                let minFiller = ""
                let hourFiller = ""
                let dayFiller = ""
                let monthFiller = ""

                if (date.getSeconds().toString().length < 2) secFiller = "0"
                if (date.getMinutes().toString().length < 2) minFiller = "0"
                if (date.getHours().toString().length < 2) hourFiller = "0"
                if (date.getDate().toString().length < 2) dayFiller = "0"
                if (date.getMonth().toString().length < 2) monthFiller = "0"

                var datetime =
                    dayFiller + date.getDate() + ". " +
                    monthFiller + (date.getMonth() + 1) + ". " +
                    date.getFullYear() + ", " +
                    hourFiller + date.getHours() + ":" +
                    minFiller + date.getMinutes() + ":" +
                    secFiller + date.getSeconds()

                const playerCount = fs.readFileSync('./data/playerrec.json', 'utf8');
                const playerCount_ = JSON.parse(playerCount)

                if (playerCount_.mostPlayers < response.onlinePlayers.toString()) {
                    let newData = {
                        mostPlayers: response.onlinePlayers.toString(),
                        date: datetime,
                        lastPinged: datetime
                    }

                    const newData_ = JSON.stringify(newData, null, 4)
                    fs.writeFileSync('./data/playerrec.json', newData_, 'utf8')

                    const embedRecord = new Discord.MessageEmbed()
                        .setColor('#14a2a3')
                        .setTitle('Neuer Spielerrekord!')
                        .setDescription(`**${response.onlinePlayers}** Spieler online!`)
                        .setFooter(`Am: ${datetime}`, iconurl)

                    await client.channels.cache.get(mcc).send({
                        embeds: [embedRecord]
                    })

                } else {
                    const playerCount1 = fs.readFileSync('./data/playerrec.json', 'utf8');
                    const playerCount1_ = JSON.parse(playerCount1)

                    let newData__ = {
                        mostPlayers: playerCount1_.mostPlayers.toString(),
                        date: playerCount1_.date.toString(),
                        lastPinged: datetime
                    }

                    const newData____ = JSON.stringify(newData__, null, 4)
                    fs.writeFileSync('./data/playerrec.json', newData____, 'utf8')
                }

                // console.log("Aktualisiere Serverping...")
                const stableCount = await fs.readFileSync('./data/playerrec.json', 'utf8');
                const stableCount_ = await JSON.parse(stableCount)
                await client.channels.cache.get(mcc).setTopic(`thevalleyy.tk  (${response.onlinePlayers}/${response.maxPlayers})  **|**  Letzter Ping: ${datetime}  **|**  🏆: ${stableCount_.mostPlayers}`)
            })
        }, 302000)

    } catch (error) {
        const embedFail = new Discord.MessageEmbed()
            .setTitle('Es gab einen Fehler beim Pingen eines Minecraft-Servers')
            .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
            .setDescription('Fehler: `' + error + '`')
            .setFooter('thevalleyy-NetWork', iconurl)
            .setTimestamp()
            .setColor('fc036b')
        client.channels.cache.get(botlog).send({
            embeds: [embedFail]
        })
    }
}