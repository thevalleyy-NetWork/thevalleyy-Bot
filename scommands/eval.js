import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Führt JavaScript-Code aus")
        .setDescriptionLocalizations({
            "en-US": "Executes JavaScript code",
            "en-GB": "Executes JavaScript code",
        })
        .addStringOption((option) =>
            option.setName("code").setDescription("JavaScript-Code").setRequired(true).setDescriptionLocalizations({
                "en-US": "JavaScript code",
                "en-GB": "JavaScript code",
            })
        ),
};
