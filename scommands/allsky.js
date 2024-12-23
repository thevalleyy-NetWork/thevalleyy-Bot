import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    cooldown: 300,
    data: new SlashCommandBuilder()
        .setName("allsky")
        .setContexts([0])
        .setDescription("✨Beobachte den Himmel✨ (fast live)")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Watch the sky",
            "en-GB": "Watch the sky",
        }),
};
