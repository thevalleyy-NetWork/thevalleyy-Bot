module.exports = {
    commands: ['text'],
    expectedArgs: '<text>',
    permissionError: 'Hm.. Irgendwas ist schief gelaufen',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: "Lässt den Bot einen Text senden",
    callback: (message, arguments, text) => {

        const iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'
        const Discord = require('discord.js')

        const textthatishouldsay = text

        if (textthatishouldsay.toLowerCase().includes('@here') || (textthatishouldsay.toLowerCase().includes('@everyone') || (textthatishouldsay.toLowerCase().includes('<@&')))) {
            message.reply('Nö <:troll:800321754873987112>')
            return
        }
        message.delete()
        message.channel.send(textthatishouldsay.substring(0, 300))


    },
    permissions: [],
    requiredRoles: ['Nice One']
}