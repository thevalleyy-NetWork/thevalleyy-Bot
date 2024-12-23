import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("test")
        .setContexts([0])
        .setDescription("Test-Befehl (nur für Admins)")
        .setDefaultMemberPermissions(0) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Test command (admin only)",
            "en-GB": "Test command (admin only)",
        }),
};
