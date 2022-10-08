const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDMPermission(false)
        .setDescription("Uptime, Ping, ect.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Uptime, ping, ect.",
            "en-GB": "Uptime, ping, ect.",
        }),
};
