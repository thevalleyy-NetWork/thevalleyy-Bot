        module.exports = {
            commands: ['restart'],
            expectedArgs: '',
            permissionError: 'Diese Nachricht sollte es nie geben',
            minArgs: 0,
            maxArgs: 0,
            callback: async(message, arguments, text) => {

                var iconurl = message.guild.iconURL({ dynamic: true })
                const modlog = '822575095721099304'
                const Discord = require('discord.js')

                await message.reply("Neustart eingeleitet.")
                await process.exit(42)
            },
            permissions: [],
            requiredRoles: ['Moderator']
        }