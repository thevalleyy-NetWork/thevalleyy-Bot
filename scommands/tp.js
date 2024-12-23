import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("tp")
        .setContexts([0])
        .setDescription("Infos zum thevalleyy-Texturepack")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Info about the thevalleyy texturepack",
            "en-GB": "Info about the thevalleyy texturepack",
        }),
};
