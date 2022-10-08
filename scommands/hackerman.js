const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hackerman")
        .setDMPermission(false)
        .setDescription("😎")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Be as cool as a real hacker 😎",
            "en-GB": "Be as cool as a real hacker 😎",
        })
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription(
                    "Text, der in Hackerman-Schrift angezeigt werden soll"
                )
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Text to encode",
                    "en-GB": "Text to encode",
                })
        ),
};
