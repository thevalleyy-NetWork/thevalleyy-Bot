import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setContexts([0])
        .setDescription("Uptime, Ping, ect.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Uptime, ping, ect.",
            "en-GB": "Uptime, ping, ect.",
        }),
};
