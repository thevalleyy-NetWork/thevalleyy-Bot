const Discord = require('discord.js')

module.exports = {
    commands: ['lyrics', 'song'],
    expectedArgs: '<search terms>',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 1,
    maxArgs: null,
    cooldown: 30000,
    description: "this description is weird",
    callback: async(message, arguments, text) => {

        // TODO: button für "lyrics: song"
        var iconurl = message.guild.iconURL({ dynamic: true })
        const modlog = '822575095721099304'

        try {
            const fetch = (await
                import ('node-fetch')).default
            const waitEmbed = new Discord.EmbedBuilder()
                .setColor('0099ff')
                .setDescription("Suche nach: `" + text.substring(0, 50) + "`...")

            message.reply({ embeds: [waitEmbed] }).then(async msg => {
                const { title, author, lyrics, thumbnail, links, error } = await fetch(`https://some-random-api.ml/lyrics?title=${text.toLowerCase().replaceAll('ä', 'ae').replaceAll('ü', 'ue').replaceAll('ö', 'oe').replaceAll('ß', 'ss')}`).then(response => response.json())

                if (error) {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('Es gab einen Fehler...')
                        .setDescription("`" + error + "`")
                        .setFooter({ text: message.guild.name, iconURL: iconurl })
                        .setTimestamp()
                    msg.edit({ embeds: [errorEmbed] })
                    return
                }


                const songEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: `${author} (${title})`, iconURL: message.author.avatarURL({ dynamic: true }), url: links.genius })
                    .setThumbnail(thumbnail.genius)
                    .setDescription(lyrics.substring(0, 4096))
                    .setColor('0099ff')
                    .setFooter({
                        text: message.guild.name,
                        iconURL: iconurl
                    })
                    .setTimestamp()   

                await msg.edit({ embeds: [songEmbed] })
            })
            .catch(err => {
                message.channel.send("Fehler: `" + err + "`")
            })
        } catch (err) {
            message.channel.send("Fehler: `" + err + "`")
        }


    },
    permissions: [],
    requiredRoles: ['Nice One']
}