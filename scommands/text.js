const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("text")
        .setDMPermission(false)
        .setDescription("Lässt den Bot einen Text senden.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Let the bot say something",
            "en-GB": "Let the bot say something",
        })
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription("Text, der gesendet werden soll")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Text to send",
                    "en-GB": "Text to send",
                })
        ),
};
