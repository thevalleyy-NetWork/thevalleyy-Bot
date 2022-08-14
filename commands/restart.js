        module.exports = {
            commands: ['restart'],
            expectedArgs: '',
            permissionError: 'Diese Nachricht sollte es nie geben',
            minArgs: 0,
            maxArgs: 0,
            cooldown: null,
            description: "Lädt den Bot neu",
            callback: async(message, arguments, text) => {

                // const iconurl = message.guild.iconURL()
                // const modlog = '822575095721099304'
                // const Discord = require('discord.js')

                await message.reply("Neustart eingeleitet.")
                await process.exit(42)
                // TODO: richtiger restart, nicht nur den process exitten
            },
            permissions: [],
            requiredRoles: ['Moderator']
        }