import { EmbedBuilder } from "discord.js"
import config from "../../config.json" with { type: "json" };

export default (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const embed = new EmbedBuilder()
        .setTitle("Admin-Bewerbung")
        .setColor(config.colors.default)
        .setDescription("Bitte sende [hier](https://tinyurl.com/bdz4kpd5) deine Bewerbung ein und wir werden sie schnellstmöglich bearbeiten.");

    interaction.reply({ embeds: [embed] });
};
