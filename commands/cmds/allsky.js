const config = require('./../../config.json');

module.exports = {
    commands: ['allsky', 'sky'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    cooldown: 10000,
    description: "this description is weird",
    callback: async(message, arguments, text) => {

        var iconurl = message.guild.iconURL({
            dynamic: true
        })

        const {
            MessageActionRow,
            Message,
            MessageEmbed,
            MessageButton,
        } = require("discord.js");

        const idStart = "SKY_"
        const buttonUp = new MessageButton()
            .setCustomId('SKY_btnUp')
            .setLabel('           🔼           ')
            .setStyle('SECONDARY');

        const buttonDown = new MessageButton()
            .setCustomId('SKY_btnDown')
            .setLabel('           🔽           ')
            .setStyle('SECONDARY');

        const buttonRight = new MessageButton()
            .setCustomId('SKY_btnRight')
            .setLabel('▶️')
            .setStyle('SECONDARY');

        const buttonReset = new MessageButton()
            .setCustomId('SKY_btnReset')
            .setLabel('🔄')
            .setStyle('SECONDARY')
            .setDisabled(true);

        const buttonLeft = new MessageButton()
            .setCustomId('SKY_btnLeft')
            .setLabel('◀️')
            .setStyle('SECONDARY');



        let buttonListUp = [buttonUp]
        let buttonListMiddle = [buttonLeft, buttonReset, buttonRight]
        let buttonListDown = [buttonDown]

        const rowUp = new MessageActionRow().addComponents(buttonListUp);
        const rowMiddle = new MessageActionRow().addComponents(buttonListMiddle);
        const rowDown = new MessageActionRow().addComponents(buttonListDown);

        message.reply({
            components: [rowUp, rowMiddle, rowDown]
        }).then(async msg => {

            const filter = i => i.customId.startsWith(idStart);
            const collector = await message.channel.createMessageComponentCollector({
                filter,
                time: 5000,
            });

            collector.on("collect", async(i) => {
                if (i.message.id !== msg.id) return
                if (i.user.id !== message.author.id && i.user.id != config.owner) {
                    i.reply({ content: "Nur `" + message.author.username + "` kann diesen Button betätigen", ephemeral: true })
                    return
                }
                await i.deferUpdate();
                collector.resetTimer();

                // code here
                // bug: doppelt -sky crasht die geschichte


            });

            collector.on("end", async() => {
                if (msg.editable) {

                    buttonListUp.forEach(btn => {
                        buttonListUp.splice(buttonListUp.indexOf(btn), 1)
                        btn.setDisabled(true);
                        buttonListUp.push(btn)
                    })

                    buttonListMiddle.forEach(btn => {
                        console.log("splicing button " + btn + " element " + buttonListMiddle.indexOf(btn))
                        buttonListMiddle.splice(buttonListMiddle.indexOf(btn), 1)
                        btn.setDisabled(true);
                        buttonListMiddle.push(btn)
                        console.log("current array " + buttonListMiddle)
                    })

                    buttonListDown.forEach(btn => {
                        buttonListDown.splice(buttonListDown.indexOf(btn), 1)
                        btn.setDisabled(true);
                        buttonListDown.push(btn)
                    })


                    console.log(buttonListMiddle)


                    const disabledRowUp = new MessageActionRow().addComponents(buttonListUp);
                    const disabledRowMiddle = new MessageActionRow().addComponents(buttonListMiddle);
                    const disabledRowDown = new MessageActionRow().addComponents(buttonListDown);

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