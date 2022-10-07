const Discord = require('discord.js')
const config = require('./../config.json')
const package = require('./../package.json').dependencies
const fs = require('fs')

module.exports = (client) => {
    // const iconurl = client.guilds.cache.get("631518992342843392").iconURL()

    // startup presence (now random)
    function setRandomPackageStatus() {
        const { maintenance } = JSON.parse(fs.readFileSync('./data/maintenance.json', 'utf8'));
        if (maintenance == true) {
            client.user.setPresence({
                activities: [{ name: "🛑 Wartungsmodus", type: Discord.ActivityType.Playing }],
                status: "dnd",
              });
        } else {
            const randomPackage = [Math.floor(Math.random() * (Object.keys(package).length))]
            const potd = Object.keys(package)[randomPackage].toString()
            const votd = Object.values(package)[randomPackage].toString().replace("^", "")
    
            client.user.setPresence({ activities: [{ name: `mit ${potd} v${votd}` }] });
        }
    }
    setRandomPackageStatus()
    setInterval(function() {
        setRandomPackageStatus()
    }, 1200000)
    

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

    // repair the sometimes broken stats json
    try {let json = require("./../data/stats.json")}
    catch {
    let jsonRecover = {"discord": {"buttonKlicks": 0}}
    
    fs.writeFile("./data/stats.json", JSON.stringify(jsonRecover, null, 4), (err) => {
        if (err) throw(err)
    })
}
}
