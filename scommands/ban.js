const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDMPermission(false)
        .setDescription("Bannt einen User")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Bans a user",
            "en-GB": "Bans a user",
        })
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User den du bannen willst")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "User to ban",
                    "en-GB": "User to ban",
                })
        )

        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Grund für den Ban")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Ban reason",
                    "en-GB": "Ban reason",
                })
        )

        .addBooleanOption((option) =>
            option
                .setName("dmdays")
                .setDescription("Nachrichten löschen? (Letzte Woche)")
                .setDescriptionLocalizations({
                    "en-US": "Delete messages? (last week)",
                    "en-GB": "Delete messages? (last week)",
                })
        ),
};
