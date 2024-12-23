import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setContexts([0])
        .setDescription("Gibt einem User die Möglichkeit zurück, zu schreiben, sprechen, reagieren, etc.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Unmutes a user",
            "en-GB": "Unmutes a user",
        })
        .addUserOption((option) =>
            option.setName("user").setDescription("Nutzer, den du unmuten möchtest").setRequired(true).setDescriptionLocalizations({
                "en-US": "User to unmute",
                "en-GB": "User to unmute",
            })
        )

        .addStringOption((option) =>
            option.setName("reason").setDescription("Grund für den Unmute").setRequired(true).setDescriptionLocalizations({
                "en-US": "Reason for the unmute",
                "en-GB": "Reason for the unmute",
            })
        ),
};
