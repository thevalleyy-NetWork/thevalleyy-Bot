module.exports = {
    commands: ['games'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    description: "this description is weird",
    callback: (message, arguments, text) => {

        message.reply('soon:tm:')

    },
    permissions: [],
    requiredRoles: ['Nice One']
}