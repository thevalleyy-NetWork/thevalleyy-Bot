const modlog = '822575095721099304'
const Discord = require('discord.js')
module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL({ dynamic: true })

    client.user.setPresence({ activities: [{ name: 'mit discordjs v13' }] });

    client.channels.cache.get("843054827910201384").messages.fetch("843060299288412190") //ticketmessage
    client.channels.cache.get("844908200628584448").messages.fetch("844912109154598912") //reactionrolesmessage
    client.channels.cache.get("786239847554875402").messages.fetch("819541946434715660") //regelwerkmessage

    client.channels.cache.forEach(async channel => {
        if (channel.name.startsWith('🔒-')) channel.send('Dieses Ticket kann nun nurnoch mit ``-archive`` und ``-del`` archiviert/gelöscht werden.').catch(console.error)
    })

    const startEmbed = new Discord.MessageEmbed()
        .setTitle('Startup <:POGGIES:786251968841515049>')
        .addField('Der Bot ist als ' + client.user.tag + ' eingeloggt.', 'Der Bot befindet sich auf ' + client.guilds.cache.size + ' Servern!')
        .setFooter({
            text: 'thevalleyy-NetWork',
            iconURL: iconurl
        })
        .setTimestamp()
        .setColor('149C51')
        .setThumbnail('https://cdn.discordapp.com/attachments/727157435869036554/831785487919611935/8fc42347d4fb3d4ef7e5683d2131bb94.webp')
        // client.channels.cache.get(modlog).send({ embeds: [startEmbed]});
}