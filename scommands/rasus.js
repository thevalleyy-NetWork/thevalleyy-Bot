const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rasus")
        .setDMPermission(false)
        .setDescription("Rasus! 😳"),
};
