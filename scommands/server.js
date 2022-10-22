const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("server")
        .setDMPermission(false)
        .setDescription("Informationen zu diesem Server")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Info about this server",
            "en-GB": "Info about this server",
        }),
};
