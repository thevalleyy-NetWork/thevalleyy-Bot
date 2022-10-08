const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const embed = new Discord.EmbedBuilder()
        .setTitle("Admin-Bewerbung")
        .setColor(config.standard_color)
        .setDescription(
            "[Bitte sende hier deine Bewerbung ein und wir werden sie schnellstmöglich bearbeiten.](https://tinyurl.com/bdz4kpd5)"
        );

    interaction.reply({ embeds: [embed] });
};
