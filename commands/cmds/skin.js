const Discord = require('discord.js')
const paginationEmbed = require('discordjs-button-pagination')
const { MessageEmbed, MessageButton } = require('discord.js')
const modlog = '822575095721099304'
const config = require('./../../config.json')

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
                        const error = new Discord.MessageEmbed()
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
                    const error = new Discord.MessageEmbed()
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

        const embed0 = new Discord.MessageEmbed()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Gesicht (2D)")
            .setImage("https://visage.surgeplay.com/face/" + uuid[0])

        const embed1 = new Discord.MessageEmbed()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Oberkörper (2D)")
            .setImage("https://visage.surgeplay.com/front/" + uuid[0])

        const embed2 = new Discord.MessageEmbed()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Körper (2D)")
            .setImage("https://visage.surgeplay.com/frontfull/" + uuid[0])

        const embed3 = new Discord.MessageEmbed()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Kopf (3D)")
            .setImage("https://visage.surgeplay.com/head/" + uuid[0])

        const embed4 = new Discord.MessageEmbed()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Oberkörper (3D)")
            .setImage("https://visage.surgeplay.com/bust/" + uuid[0])

        const embed5 = new Discord.MessageEmbed()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Körper (3D)")
            .setImage("https://visage.surgeplay.com/full/" + uuid[0])

        const embed6 = new Discord.MessageEmbed()
            .setColor(config.standard_color)
            .setTimestamp()
            .setTitle("Skin von " + name[0])
            .setDescription("Infos & Links")
            .setThumbnail("https://visage.surgeplay.com/head/" + uuid[0])
            .addField("​", "**Infos**:", false)
            .addField("​", "• [Skin-API](https://visage.surgeplay.com/index.html)", true)
            .addField("​", `• [Username API](https://api.mojang.com/users/profiles/minecraft/${name[0]})`, true)
            .addField("​", `• [uuid API](https://sessionserver.mojang.com/session/minecraft/profile/${uuid[0].slice()})`, true)
            .addField("​", "**Links**:", false)
            .addField("​", `• [Skin](https://visage.surgeplay.com/skin/${uuid[0]})`, true)
            .addField("​", `• [NameMC](https://de.namemc.com/profile/${name[0]})`, true)
        if (uuid[0].includes("-")) {
            embed6.addField("​", `• [MCProfile](https://mcprofile.net/profile/${uuid[0]})`, true)
        } else {
            embed6.addField("​", `• [MCProfile](https://mcprofile.net/profile/${uuid[0].slice(0, 8)}-${uuid[0].slice(8, 12)}-${uuid[0].slice(12, 16)}-${uuid[0].slice(16, 20)}-${uuid[0].slice(20)})`, true)
        }
        embed6.addField("Player-Name", `\`${name[0]}\``, true)
        if (uuid[0].includes("-")) {
            embed6.addField("uuid", `\`${uuid[0]}\``, true)
        } else {
            embed6.addField("uuid", `\`${uuid[0].slice(0, 8)}-${uuid[0].slice(8, 12)}-${uuid[0].slice(12, 16)}-${uuid[0].slice(16, 20)}-${uuid[0].slice(20)}\``, true)
        }

        const button1 = new MessageButton()
            .setCustomId('previousbtn')
            .setLabel('◀️')
            .setStyle('DANGER');

        const button2 = new MessageButton()
            .setCustomId('nextbtn')
            .setLabel('▶️')
            .setStyle('SUCCESS');

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