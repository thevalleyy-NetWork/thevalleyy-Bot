const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("skin")
        .setDMPermission(false)
        .setDescription("Infos zu einem Minecraft-Spieler")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Info about a Minecraft player",
            "en-GB": "Info about a Minecraft player",
        })
        .addStringOption((option) =>
            option
                .setName("player")
                .setDescription("Spielername oder UUID")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "player name or uuid",
                    "en-GB": "player name or uuid",
                })
        ),
};
