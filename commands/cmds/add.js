module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<number1> <number2>',
    permissionError: 'Für diesen Befehlt brauchst du Adminrechte',
    minArgs: 2,
    maxArgs: 2,
    cooldown: null,
    description: "this description is weird",
    callback: (message, arguments, text) => {
        const num1 = +arguments[0].substring(0, 200)
        const num2 = +arguments[1].substring(0, 200)

        if (Number.isNaN(num1 + num2)) {
            message.reply("Das Ergebnis ist nicht numerisch")
        } else {
            message.reply('Die Summe ist: `' + `${num1 + num2}` + '`')
        }
    },
    permissions: [],
    requiredRoles: ['Nice One']
}