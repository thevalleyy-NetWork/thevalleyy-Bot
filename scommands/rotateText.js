const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("rotatetext")
        .setDMPermission(false)
        .setDescription("Dreht alle gängigen Buchstaben um")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Rotates all common letters",
            "en-GB": "Rotates all common letters",
        })
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription("Text")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Text to rotate",
                    "en-GB": "Text to rotate",
                })
        ),
};
