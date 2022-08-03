const modlog = '822575095721099304'
const mcc = '786266120381399042'
const Discord = require('discord.js')
const util = require('minecraft-server-util')
const fs = require('fs');

module.exports = (client) => {
    try {
        setInterval(function() {
            util.status('node2.chaosbothosting.de', 25504).catch(error => {
                const failEmbed = new Discord.EmbedBuilder()
                    .setTitle('Es gab einen Fehler bei mcping.js')
                    .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                    .setDescription('Fehler: `' + error + '`')
                    .setTimestamp()
                    .setColor('#fc036b')

                message.client.channels.cache.get(modlog).send({ embeds: [failEmbed] })
            }).then(async(response) => {
                if (!response) return

                // var date = new Date()

                // let secFiller = ""
                // let minFiller = ""
                // let hourFiller = ""
                // let dayFiller = ""
                // let monthFiller = ""

                // if (date.getSeconds().toString().length < 2) secFiller = "0"
                // if (date.getMinutes().toString().length < 2) minFiller = "0"
                // if (date.getHours().toString().length < 2) hourFiller = "0"
                // if (date.getDate().toString().length < 2) dayFiller = "0"
                // if (date.getMonth().toString().length < 2) monthFiller = "0"

                // var datetime =
                //     dayFiller + date.getDate() + ". " +
                //     monthFiller + (date.getMonth() + 1) + ". " +
                //     date.getFullYear() + ", " +
                //     hourFiller + date.getHours() + ":" +
                //     minFiller + date.getMinutes() + ":" +
                //     secFiller + date.getSeconds()

                const json = JSON.parse(fs.readFileSync('./data/playerrec.json', 'utf8'))

                if (json.mostPlayers < response.players.online.toString()) {
                    let newData = {
                        mostPlayers: response.players.online.toString(),
                        date: Math.round(new Date().getTime() / 1000),
                        lastPinged: Math.round(new Date().getTime() / 1000)
                    }

                    const newData_ = JSON.stringify(newData, null, 4)
                    fs.writeFileSync('./data/playerrec.json', newData_, 'utf8')

                    const embedRecord = new Discord.EmbedBuilder()
                        .setColor('#14a2a3')
                        .setTitle('Neuer Spielerrekord!')
                        .setDescription(`**${response.players.online}** Spieler online!`)
                        .setTimestamp()

                    await client.channels.cache.get(mcc).send({ embeds: [embedRecord] })

                } else {
                    const playerCount = JSON.parse(fs.readFileSync('./data/playerrec.json', 'utf8'))

                    let newData__ = {
                        mostPlayers: playerCount.mostPlayers.toString(),
                        date: playerCount.date.toString(),
                        lastPinged: Math.round(new Date().getTime() / 1000)
                    }

                    const newData____ = JSON.stringify(newData__, null, 4)
                    fs.writeFileSync('./data/playerrec.json', newData____, 'utf8')
                }

                // console.log("Aktualisiere Serverping...")
                const stableCount = await fs.readFileSync('./data/playerrec.json', 'utf8');
                const stableCount_ = await JSON.parse(stableCount)
                if (response.version.name.toString().toLowerCase().includes("wartungen")) { await client.channels.cache.get(mcc).setTopic(`thevalleyy.tk **|** <:warning:981932931343855636> Wartungen  **|**  Letzter Ping: <t:${Math.round(new Date().getTime()/1000)}:R>`) } else await client.channels.cache.get(mcc).setTopic(`thevalleyy.tk  (${response.players.online}/${response.players.max})  **|**  Letzter Ping: <t:${Math.round(new Date().getTime()/1000)}:R>  **|**  🏆: ${stableCount_.mostPlayers}`)
            })
        }, 302000)

    } catch (error) {
        const embedFail = new Discord.EmbedBuilder()
            .setTitle('Es gab einen Fehler beim Pingen eines Minecraft-Servers')
            .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
            .setDescription('Fehler: `' + error + '`')
            .setFooter({ text: 'thevalleyy-NetWork', iconURL: iconurl })
            .setTimestamp()
            .setColor('fc036b')
        client.channels.cache.get(modlog).send({
            embeds: [embedFail]
        })
    }
}