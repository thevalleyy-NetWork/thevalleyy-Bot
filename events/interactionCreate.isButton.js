const fs = require('fs')
let json = require("./../data/stats.json")
// const {
//     ActionRowBuilder,
//     Message,
//     EmbedBuilder,
//     ButtonBuilder,
// } = require("discord.js");

module.exports = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;
        if (interaction.user.bot) return;

        json.discord.buttonKlicks += 1
        fs.writeFile("./data/stats.json", JSON.stringify(json, null, 4), (err) => {
            if (err) throw(err)
        })
    });
}