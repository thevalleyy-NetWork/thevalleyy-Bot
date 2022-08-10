module.exports = {
    commands: ['rasus', 'russus', 'rusas', 'ruas'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    description: "RASUS!",
    callback: async(message, arguments, text) => {
        var rusasarray = [
            'ruuuuuuuuusas',
            'raaaaaaaaasus',
            'RUSSUS',
            'RUAS',
            'RUUUUUUUUUUUUUUUUUSAS',
            'RAAAAAAAAAAAAAASUS',
            'ach rusas',
            'RASUS du Kek :flushed:',
            'rinsas <:troll:800321754873987112>',
            'susar!'
        ]

        var rusasarray2 = rusasarray[Math.floor(Math.random() * rusasarray.length)]
        message.delete()


        if (message.reference) {
            const reaktionsmsg = await message.fetchReference()

            if (reaktionsmsg === undefined) return message.channel.send(rusasarray2)

            await reaktionsmsg.reply(rusasarray2)
            
        } else message.channel.send(rusasarray2)

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}