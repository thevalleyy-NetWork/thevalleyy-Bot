module.exports = {
    commands: ['help'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    description: "this description is weird",
    callback: (message, arguments, text) => {
        message.reply("Sorry, aber tali ist einfach zu faul mal ne hilfe zu adden")

        //TODO: automatisieren, help crasht
    },
    permissions: [],
    requiredRoles: ['Mitglied']
}