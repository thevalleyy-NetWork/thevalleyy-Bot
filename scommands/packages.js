const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("packages")
        .setDMPermission(false)
        .setDescription("Zeigt alle installierten NPM-Packages an.")
        .setDescriptionLocalizations({
            "en-US": "Shows all installed npm packages",
            "en-GB": "Shows all installed npm packages",
        }),
};
