import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("rotatetext")
        .setContexts([0])
        .setDescription("Dreht alle gängigen Buchstaben um")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Rotates all common letters",
            "en-GB": "Rotates all common letters",
        })
        .addStringOption((option) =>
            option.setName("text").setDescription("Text").setRequired(true).setDescriptionLocalizations({
                "en-US": "Text to rotate",
                "en-GB": "Text to rotate",
            })
        ),
};
