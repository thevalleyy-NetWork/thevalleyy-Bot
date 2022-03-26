const fetch =
    import ('node-fetch')
const Discord = require('discord.js')

module.exports = {
    commands: ['lyrics', 'song'],
    expectedArgs: '<search terms>',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 1,
    maxArgs: null,
    callback: async(message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const mod - log = '822575095721099304'

        try {
            const waitEmbed = new Discord.MessageEmbed()
                .setColor('0099ff')
                .setDescription("Suche nach: `" + text.substring(0, 50) + "`...")

            message.reply({ embeds: [waitEmbed] }).then(async msg => {
                const { title, author, lyrics, thumbnail, links, error } = await fetch(`https://some-random-api.ml/lyrics?title=${text.toLowerCase().replaceAll('ä', 'ae').replaceAll('ü', 'ue').replaceAll('ö', 'oe').replaceAll('ß', 'ss')}`).then(response => response.json())

                if (error) {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Es gab einen Fehler...')
                        .setDescription("`" + error + "`")
                        .setFooter(message.guild.name, iconurl)
                        .setTimestamp()
                    msg.edit({ embeds: [errorEmbed] })
                    return
                }



                const songEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author} (${title})`, "", links.genius)
                    .setThumbnail(thumbnail.genius)
                    .setDescription(lyrics.substring(0, 4096))
                    .setColor('0099ff')
                    .setFooter(message.guild.name, iconurl)
                    .setTimestamp()

                await msg.edit({ embeds: [songEmbed] })
            }).catch(err => {
                message.channel.send("Fehler: `" + err + "`")
            })
        } catch (err) {
            message.channel.send("Fehler: `" + err + "`")
        }


    },
    permissions: [],
    requiredRoles: ['Nice One']
}