const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("user")
        .setDMPermission(false)
        .setDescription("Infos zu einem User")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Info about a user",
            "en-GB": "Info about a user",
        })
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Nutzer")
                .setDescriptionLocalizations({
                    "en-US": "User",
                    "en-GB": "User",
                })
        ),
};
