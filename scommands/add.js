const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDMPermission(false)
        .setDescription("Addiert zwei Zahlen")
        .setDefaultMemberPermissions(
            PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers
        ) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Get the sum of two numbers",
            "en-GB": "Get the sum of two numbers",
        })
        .addNumberOption((option) =>
            option
                .setName("number1")
                .setDescription("Erste Zahl")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "First number",
                    "en-GB": "First number",
                })
        )

        .addNumberOption((option) =>
            option
                .setName("number2")
                .setDescription("Zweite Zahl")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Second number",
                    "en-GB": "Second number",
                })
        ),
};
