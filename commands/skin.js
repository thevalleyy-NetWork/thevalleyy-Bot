const Discord = require('discord.js')
const paginationEmbed = require('discordjs-button-pagination')
const { EmbedBuilder, ButtonBuilder } = require('discord.js')
const modlog = '822575095721099304'
const config = require('../config.json')

module.exports = {
    commands: ['skin', 'mcskin', 'minecraftskin'],
    expectedArgs: '<name/uuid>',
    permissionError: 'Du bist nicht berechtigt, diesen Befehl zu nutzen.',
    minArgs: 1,
    maxArgs: 1,
    cooldown: 10000,
    description: "this description is weird",
    callback: async(message, arguments, text) => {

        const fetch = (await
            import ('node-fetch')).default

        const mcreq = arguments[0].substring(0, 50)
        let uuid = []
        let name = []

        if (mcreq.length > 16) {
            uuid.push(mcreq)
        } else {
            await fetch('https://api.mojang.com/users/profiles/minecraft/' + mcreq).then(async response => {

                if (response.status == 200) {
                    await response.json().then(async json => {
                        uuid.push(json.id, "ok")
                        name.push(json.name)
                    })
                } else {
                    if (response.status == 204) {
                        message.reply("Der angegebene Spieler existiert nicht.")
                    } else {
                        const error = new Discord.EmbedBuilder()
                            .setColor('#ff0000')
                            .setTitle('Es gab einen Fehler...')
                            .setDescription("`" + response.statusText + "`\nAPI: " + response.url + "\nStatus: " + response.status)
                            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                        message.reply({ embeds: [error] })
                    }
                }
            })
        }

        if (!uuid[0]) return
        await fetch('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid[0]).then(async response => {
            if (uuid[1] == "ok") return

            if (response.status == 200) {
                await response.json().then(async json => {
                    name.push(json.name)
                })
            } else {
                if (response.status == 204 || response.status == 400) {
                    message.reply("Die angegebene UUID existiert nicht.")
                } else {
                    const error = new Discord.EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('Es gab einen Fehler...')
                        .setDescription("`" + response.statusText + "`\nAPI: " + response.url + "\nStatus: " + response.status)
                        .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                    message.reply({ embeds: [error] })
                }
            }
        })
        if (!uuid[0]) return

        let embeds = []

        const embed0 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Gesicht (2D)")
            .setImage("https://visage.surgeplay.com/face/" + uuid[0])

        const embed1 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Oberkörper (2D)")
            .setImage("https://visage.surgeplay.com/front/" + uuid[0])

        const embed2 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Körper (2D)")
            .setImage("https://visage.surgeplay.com/frontfull/" + uuid[0])

        const embed3 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Kopf (3D)")
            .setImage("https://visage.surgeplay.com/head/" + uuid[0])

        const embed4 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Oberkörper (3D)")
            .setImage("https://visage.surgeplay.com/bust/" + uuid[0])

        const embed5 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Körper (3D)")
            .setImage("https://visage.surgeplay.com/full/" + uuid[0])

        const embed6 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Infos & Links")
            .setThumbnail("https://visage.surgeplay.com/head/" + uuid[0])
            .addFields([
                { name: "​", value: "**Infos**:", inline: false },
                { name: "​", value: "• [Skin-API](https://visage.surgeplay.com/index.html)", inline: true },
                { name: "​", value: `• [Username API](https://api.mojang.com/users/profiles/minecraft/${name[0]})`, inline: true },
                { name: "​", value: `• [uuid API](https://sessionserver.mojang.com/session/minecraft/profile/${uuid[0].slice()})`, inline: true },
                { name: "​", value: "**Links**:", inline: false },
                { name: "​", value: `• [Skin](https://visage.surgeplay.com/skin/${uuid[0]})`, inline: true },
                { name: "​", value: `• [NameMC](https://de.namemc.com/profile/${name[0]})`, inline: true },
            ])

        if (uuid[0].includes("-")) {
            embed6.addFields([{ name: "​", value: `• [MCProfile](https://mcprofile.net/profile/${uuid[0]})`, inline: true}])
        } else {
            embed6.addFields([{ name: "​", value: `• [MCProfile](https://mcprofile.net/profile/${uuid[0].slice(0, 8)}-${uuid[0].slice(8, 12)}-${uuid[0].slice(12, 16)}-${uuid[0].slice(16, 20)}-${uuid[0].slice(20)})`, inline: true}])
        }
        embed6.addFields([{ name: "Player-Name", value: `\`${name[0]}\``, inline: true}])
        if (uuid[0].includes("-")) {
            embed6.addFields([{ name: "uuid", value: `\`${uuid[0]}\``, inline: true}])
        } else {
            embed6.addFields([{ name: "uuid", value: `\`${uuid[0].slice(0, 8)}-${uuid[0].slice(8, 12)}-${uuid[0].slice(12, 16)}-${uuid[0].slice(16, 20)}-${uuid[0].slice(20)}\``, inline: true}])
        }

        const button1 = new ButtonBuilder()
            .setCustomId('previousbtn')
            .setLabel('◀️')
            .setStyle("Danger");

        const button2 = new ButtonBuilder()
            .setCustomId('nextbtn')
            .setLabel('▶️')
            .setStyle("Success");

        buttonList = [
            button1,
            button2
        ]


        embeds.push(embed0, embed1, embed2, embed3, embed4, embed5, embed6)

        paginationEmbed(message, embeds, buttonList)
    },
    permissions: [],
    requiredRoles: ['Nice One']
}