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

        const rusas = rusasarray[Math.floor(Math.random() * rusasarray.length)]
        message.delete()


        if (message.reference) {
            const reaktionsmsg = await message.fetchReference()
            await reaktionsmsg.reply({ content: rusas, failIfNotExists: false })
        } else message.channel.send(rusas)

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}