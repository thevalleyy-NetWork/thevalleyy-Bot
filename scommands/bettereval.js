import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("bettereval")
        .setDMPermission(true)
        .setDescription("Führt Shellcode aus")
        .setDescriptionLocalizations({
            "en-US": "Executes shellcode",
            "en-GB": "Executes shellcode",
        })
        .addStringOption((option) =>
            option.setName("code").setDescription("Shellcode").setRequired(true).setDescriptionLocalizations({
                "en-US": "Shellcode",
                "en-GB": "Shellcode",
            })
        ),
};
