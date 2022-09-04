const Discord = require('discord.js');
const config = require('../../config.json');
const fs = require('node:fs')
const util = require('minecraft-server-util')

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

        var ip = interaction.options.getString('ip');
        var port = interaction.options.getString('port');

    if (!interaction.options.getString("ip") && !interaction.options.getString("port")) {
        var ip = "thevalleyy.tk"
        var port = ""
    }
    if (!interaction.options.getString("port")) {
        var port = "25565"
    }

    util.status(ip, parseInt(port)).catch(error => {
        //ERROR
        interaction.reply("Es gab einen Fehler...\n" + error)
        return
    }).then(async(response) => {
        if (!response) return interaction.reply("Der Server ist nicht erreichbar.")

        const embed = new Discord.EmbedBuilder()
            .setTitle(ip + ":" + port)
            .setTimestamp()
            .setColor(config.standard_color)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .addFields([
                { name: "Spieler:", value: `(${response.players.online}/${response.players.max})`, inline: true},
                { name: "Version:", value: `${response.version.name} (${response.version.protocol})`, inline: true},
                { name: "Ping:", value: response.roundTripLatency.toString() + "ms", inline: true}
            ])

            .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + ip + ":" + port)
            .setImage(`http://status.mclive.eu/${ip}/${ip}/${port}/banner.png`)


        if (ip == "thevalleyy.tk") {
            const json = JSON.parse(fs.readFileSync("./data/playerrec.json", 'utf8'))
            
            embed.addFields([
                { name: "Spielerrekord:", value: json.mostPlayers.toString(), inline: true},
                { name: "Erreicht am:", value: `<t:${json.date}:R>`, inline: true},
                { name: "Letzter Ping:", value: `<t:${json.lastPinged}:R>`, inline: true},
            ])
        }
        embed.addFields([{ name: "​", value: `[${ip} auf NameMC](https://namemc.com/server/${ip}:${port})`, inline: false}])

        await interaction.reply({ embeds: [embed] })

    })

}