const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Schickt eine Nachricht an einen User.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Sends a message to a member",
            "en-GB": "Sends a message to a member",
        })
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription(
                    "Nutzer, an den die Nachricht gesendet werden soll"
                )
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "User to send the message to",
                    "en-GB": "User to send the message to",
                })
        )

        .addStringOption((option) =>
            option
                .setName("content")
                .setDescription("Inhalt der Nachricht")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Content of the message",
                    "en-GB": "Content of the message",
                })
        ),
};
