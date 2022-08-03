const modlog = '822575095721099304'
const Discord = require('discord.js')
const config = require('./../config.json')
const package = require('./../package.json').dependencies
const fs = require('fs')

module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL({ dynamic: true })

    // startup presence (now random)
    function setRandomPackageStatus() {
        const randomPackage = [Math.floor(Math.random() * (Object.keys(package).length))]
        const potd = Object.keys(package)[randomPackage].toString()
        const votd = Object.values(package)[randomPackage].toString().replace("^", "")

        client.user.setPresence({ activities: [{ name: `mit ${potd} v${votd}` }] });
    }
    setRandomPackageStatus()
    setInterval(function() {
        setRandomPackageStatus()
    }, 1200000)
    

    // fetch some reaction messages (soom replaced with buttons)
    client.channels.cache.get("843054827910201384").messages.fetch("843060299288412190") //ticketmessage
    client.channels.cache.get("844908200628584448").messages.fetch("844912109154598912") //reactionrolesmessage
    client.channels.cache.get("786239847554875402").messages.fetch("819541946434715660") //regelwerkmessage

    // send message to deleted ticket (also soon replaced with better system)
    client.channels.cache.forEach(async channel => {
        if (channel.name.startsWith('🔒-')) channel.send('Dieses Ticket kann nun nurnoch mit `-archive` und `-del` archiviert/gelöscht werden.').catch(console.error)
    })

    // maybe send a startup embed
    const startEmbed = new Discord.EmbedBuilder()
        .setTitle('Startup <:POGGIES:786251968841515049>')
        .addFields([{ name: 'Der Bot ist als ' + client.user.tag + ' eingeloggt.', value: 'Der Bot befindet sich auf ' + client.guilds.cache.size + ' Servern!'}])
        .setFooter({
            text: 'thevalleyy-NetWork',
            iconURL: iconurl
        })
        .setTimestamp()
        .setColor('149C51')
        .setThumbnail('https://cdn.discordapp.com/attachments/727157435869036554/831785487919611935/8fc42347d4fb3d4ef7e5683d2131bb94.webp')
        // client.channels.cache.get(modlog).send({ embeds: [startEmbed]});



    // request brickset api key & userhash
    fetch('https://brickset.com/api/v3.asmx/checkKey?apikey=' + config.keys.brickset).then(async response =>
        response.json()).then(apijson => {

        // request userhash
        fetch(`https://brickset.com/api/v3.asmx/login?apikey=${config.keys.brickset}&username=${config.keys.brickset_username}&password=${config.keys.brickset_password}`).then(async response =>
            response.json()).then(userjson => {
            userjson.hash

            const json = {
                "apikey": apijson,
                "userkey": userjson
            }

            fs.writeFile(`./data/brickset.json`, JSON.stringify(json, null, 4), function(err) {
                if (err) console.log(err)
            });
        })
    })
}