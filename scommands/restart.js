const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("restart")
        .setDescription("Startet den Bot neu.")
        .setDescriptionLocalizations({
            "en-US": "Restarts the bot",
            "en-GB": "Restarts the bot",
        }),
};
