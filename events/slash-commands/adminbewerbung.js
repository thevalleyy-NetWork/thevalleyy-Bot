const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const embed = new Discord.EmbedBuilder()
        .setTitle("Admin-Bewerbung")
        .setColor(config.standard_color)
        .setDescription(
            "Bitte sende [hier](https://tinyurl.com/bdz4kpd5) deine Bewerbung ein und wir werden sie schnellstmöglich bearbeiten."
        );

    interaction.reply({ embeds: [embed] });
};
