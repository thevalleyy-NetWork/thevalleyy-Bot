const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDMPermission(false)
        .setDescription("Test-Befehl (nur für Admins)")
        .setDefaultMemberPermissions(0) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Test command (admin only)",
            "en-GB": "Test command (admin only)",
        }),
};
