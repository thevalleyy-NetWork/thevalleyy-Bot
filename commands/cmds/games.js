module.exports = {
    commands: ['games'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {

        message.reply('soon:tm:')

    },
    permissions: [],
    requiredRoles: ['Nice Ome']
}