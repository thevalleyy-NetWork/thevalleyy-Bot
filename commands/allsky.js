const config = require('../config.json');

module.exports = {
    commands: ['allsky', 'sky', 'allsky7'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    cooldown: 60000,
    description: "Aktuelle Bilder, aufgenommen von einer AllSky7-Kamera in Sonneberg.",
    callback: async(message, arguments, text) => {

        let x = 0
        let y = 0
        let now = Date.now()

        const iconurl = message.guild.iconURL()

        const {
            Message,
            EmbedBuilder,
            ButtonBuilder,
            ButtonStyle,
            ActionRowBuilder
        } = require("discord.js");

        const idStart = "SKY_"
        const buttonUp = new ButtonBuilder()
            .setCustomId('SKY_btnUp')
            .setLabel('           🔼           ')
            .setStyle("Secondary");

        const buttonDown = new ButtonBuilder()
            .setCustomId('SKY_btnDown')
            .setLabel('           🔽           ')
            .setStyle("Secondary");

        const buttonRight = new ButtonBuilder()
            .setCustomId('SKY_btnRight')
            .setLabel('▶️')
            .setStyle("Secondary");

        const buttonReset = new ButtonBuilder()
            .setCustomId('SKY_btnReset')
            .setLabel('🔄')
            .setStyle("Secondary")
            .setDisabled(true);

        const buttonLeft = new ButtonBuilder()
            .setCustomId('SKY_btnLeft')
            .setLabel('◀️')
            .setStyle("Secondary");


        const startEmbed = new EmbedBuilder()
            .setTitle('Allsky')
            .setColor(config.standard_color)
            .setTimestamp(now)
            .setFooter({ text: message.guild.name, iconURL: iconurl })
            .setImage("https://archive.allsky.tv/AMS52/LATEST/010314.jpg")
            .addFields([
                { name: "Ort:", value: "Sonneberg, Thüringen", inline: true },
                { name: "Bilder von:", value: "https://allsky7.net/", inline: true}])


        let buttonListUp = [buttonUp]
        let buttonListMiddle = [buttonLeft, buttonReset, buttonRight]
        let buttonListDown = [buttonDown]

        const rowUp = new ActionRowBuilder().addComponents(buttonListUp);
        const rowMiddle = new ActionRowBuilder().addComponents(buttonListMiddle);
        const rowDown = new ActionRowBuilder().addComponents(buttonListDown);

        message.reply({
            components: [rowUp, rowMiddle, rowDown],
            embeds: [startEmbed]
        }).then(async msg => {

            const filter = i => i.customId.startsWith(idStart);
            const collector = await message.channel.createMessageComponentCollector({
                filter,
                time: 60000,
            });

            collector.on("collect", async(i) => {
                if (i.message.id !== msg.id) return
                if (i.user.id !== message.author.id && i.user.id != config.owner) {
                    i.reply({ content: "Nur `" + message.author.username + "` kann diesen Button betätigen", ephemeral: true })
                    return
                }
                await i.deferUpdate();
                collector.resetTimer();

                if (i.customId.endsWith('btnUp')) {
                    if (y >= 2) { y = 0 } else { y += 1 }
                }

                if (i.customId.endsWith('btnDown')) {
                    if (y <= 0) { y = 2 } else { y -= 1 }
                }

                if (i.customId.endsWith('btnRight')) {
                    if (x >= 4) { x = 0 } else { x += 1 }
                }

                if (i.customId.endsWith('btnLeft')) {
                    if (x <= 0) { x = 4 } else { x -= 1 }
                }

                if (i.customId.endsWith('btnReset')) {
                    x = 0
                    y = 0
                }

                if (x == 0 && y == 0) {
                    buttonReset.setDisabled(true)
                } else {
                    buttonReset.setDisabled(false)
                }

                const embed = new EmbedBuilder()
                    .setTitle(`Allsky ||X = ${x}; Y = ${y}||`)
                    .setColor(config.standard_color)
                    .setFooter({ text: message.guild.name, iconURL: iconurl })
                    .setTimestamp(now)
                if (y == 1) embed.setImage("https://sonneberg.allsky7.net/latest/010319.jpg")
                if (y >= 2) embed.setImage("https://sonneberg.allsky7.net/latest/010320.jpg")
                if (y <= 0 && x <= 0) embed.setImage("https://sonneberg.allsky7.net/latest/010314.jpg")
                if (y <= 0 && x == 1) embed.setImage("https://sonneberg.allsky7.net/latest/010315.jpg")
                if (y <= 0 && x == 2) embed.setImage("https://sonneberg.allsky7.net/latest/010316.jpg")
                if (y <= 0 && x == 3) embed.setImage("https://sonneberg.allsky7.net/latest/010317.jpg")
                if (y <= 0 && x >= 4) embed.setImage("https://sonneberg.allsky7.net/latest/010318.jpg")

                let buttonListUp = [buttonUp]
                let buttonListMiddle = [buttonLeft, buttonReset, buttonRight]
                let buttonListDown = [buttonDown]

                const rowUp = new ActionRowBuilder().addComponents(buttonListUp);
                const rowMiddle = new ActionRowBuilder().addComponents(buttonListMiddle);
                const rowDown = new ActionRowBuilder().addComponents(buttonListDown);

                i.editReply({
                    components: [rowUp, rowMiddle, rowDown],
                    embeds: [embed]
                })

                // bug: doppelt -sky 


            });

            collector.on("end", async() => {
                if (msg.editable) {

                    for (let i = 0; i < buttonListUp.length; i++) {
                        const btn = buttonListUp[i];
                        btn.setDisabled(true);
                        buttonListUp[i] = btn
                    }

                    for (let i = 0; i < buttonListMiddle.length; i++) {
                        const btn = buttonListMiddle[i];
                        btn.setDisabled(true);
                        buttonListMiddle[i] = btn
                    }

                    for (let i = 0; i < buttonListDown.length; i++) {
                        const btn = buttonListDown[i];
                        btn.setDisabled(true);
                        buttonListDown[i] = btn
                    }


                    const disabledRowUp = new ActionRowBuilder().addComponents(buttonListUp);
                    const disabledRowMiddle = new ActionRowBuilder().addComponents(buttonListMiddle);
                    const disabledRowDown = new ActionRowBuilder().addComponents(buttonListDown);

                    msg.edit({
                        components: [disabledRowUp, disabledRowMiddle, disabledRowDown],
                    });
                }
            });

        })



    },
    permissions: [],
    requiredRoles: ['Mitglied']
}