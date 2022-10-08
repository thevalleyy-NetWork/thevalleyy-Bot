const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverlist")
        .setDescription("Alle Server auf denen der Bot ist.")
        .setDescriptionLocalizations({
            "en-US": "All servers the bot is on",
            "en-GB": "All servers the bot is on",
        }),
};
