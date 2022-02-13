module.exports = {
    commands: ['ping'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    callback: async(message, arguments, text) => {

        let tps = 0
        s = Date.now()
        while (Date.now() - s <= 1) tps++
            tps *= 1000 //:HugTomate:

        message.reply('...').then(m => {
            m.edit("- Bot: `" + `${m.createdTimestamp - message.createdTimestamp}` + "ms`\n- API: `" + `${Math.round(message.client.ws.ping)}` + "ms`\n- TPS: `" + tps + "`")
        })

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}