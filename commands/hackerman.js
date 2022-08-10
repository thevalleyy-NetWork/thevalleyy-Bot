module.exports = {
    commands: ['hackerman'],
    expectedArgs: '<text>',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: ":sunglasses:",
    callback: (message, arguments, text) => {
        const hackertext1 = text

        if (hackertext1.toLowerCase().includes('@here') || (hackertext1.toLowerCase().includes('@everyone') || (hackertext1.toLowerCase().includes('<@&')))) return
        message.delete()


        const hackertext2 = hackertext1.toLowerCase()
            .replaceAll('sus', '<:SUS:843876559941402654>')
            .replaceAll('leet', '1337')
            .replaceAll('a', '4')
            .replaceAll('i', '1')
            .replaceAll('e', '3')
            .replaceAll('a', '@')
            .replaceAll('1337', 'LEET')
            .replaceAll('i', '|')
            .replaceAll('s', '5')
            .replaceAll('s', '2')
            .replaceAll('o', '0')
            .replaceAll('n', '|/|')
            .replaceAll('d', '|)')
            .replaceAll('m', '|\|/|')
            .replaceAll('g', 'q')
            .replaceAll('l', '|_')
            .replaceAll('t', "']['")
            .replaceAll('b', '|>')
            .replaceAll('c', '<')
            .substring(0, 300)
        message.channel.send(hackertext2)

    },
    permissions: [],
    requiredRoles: ['Nice One']
}