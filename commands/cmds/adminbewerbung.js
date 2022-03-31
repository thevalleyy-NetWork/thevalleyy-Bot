module.exports = {
    commands: ['adminbewerbung'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    description: "this description is weird",
    callback: (message, arguments, text) => {

        message.reply('Hier ist der Link zur Adminbewerbung: \n**http://btly.xyz/r/Jerns9D**')

    },
    permissions: [],
    requiredRoles: ['Nice One']
}