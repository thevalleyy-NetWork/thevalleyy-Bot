        module.exports = {
            commands: ['restart'],
            expectedArgs: '',
            permissionError: 'Diese Nachricht sollte es nie geben',
            minArgs: 0,
            maxArgs: 0,
            callback: async(message, arguments, text) => {

                var iconurl = message.guild.iconURL({ dynamic: true })
                const mod - log = '822575095721099304'
                const Discord = require('discord.js')

                const successEmbed = new Discord.MessageEmbed()
                    .setTitle('-restart ausgeführt')
                    .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
                    .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('03f8fc')
                await message.client.channels.cache.get(mod - log).send({ embeds: [successEmbed] })
                await message.reply("Neustart eingeleitet.")
                await process.exit(42)
            },
            permissions: [],
            requiredRoles: ['Moderator']
        }