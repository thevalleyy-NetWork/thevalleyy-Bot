const fs = require('fs')
try {
let json = require("./../data/stats.json")
} catch {
let jsonRecover = {"discord": {"buttonKlicks": 0}}

fs.writeFile("./data/stats.json", JSON.stringify(jsonRecover, null, 4), (err) => {
    if (err) throw(err)
})

}

// const {
//     ActionRowBuilder,
//     Message,
//     EmbedBuilder,
//     ButtonBuilder,
// } = require("discord.js");

module.exports = (client, interaction) => {
        if (!interaction.isButton()) return;
        if (interaction.user.bot) return;


        let json = require("./../data/stats.json")
        json.discord.buttonKlicks += 1
    
        
        fs.writeFile("./data/stats.json", JSON.stringify(json, null, 4), (err) => {
            if (err) throw(err)
        })
}