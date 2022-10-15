const fs = require("fs");
let json = require("./../data/stats.json");

module.exports = (client, interaction) => {
    if (!interaction.isButton()) return;

    let json = require("./../data/stats.json");
    json.discord.buttonKlicks += 1;

    fs.writeFile("./data/stats.json", JSON.stringify(json, null, 4), (err) => {
        if (err) client.error(err, "isButton.js");
    });
};
