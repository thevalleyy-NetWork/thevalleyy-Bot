import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("server")
        .setContexts([0])
        .setDescription("Informationen zu diesem Server")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Info about this server",
            "en-GB": "Info about this server",
        }),
};
