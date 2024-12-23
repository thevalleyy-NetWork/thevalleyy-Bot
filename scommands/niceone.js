import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("niceone")
        .setContexts([0])
        .setDescription("Toggelt die Nice One Rolle eines Users")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Toggles the Nice One role of a user",
            "en-GB": "Toggles the Nice One role of a user",
        })
        .addUserOption((option) =>
            option.setName("user").setDescription("Nutzer").setRequired(true).setDescriptionLocalizations({
                "en-US": "User",
                "en-GB": "User",
            })
        ),
};
