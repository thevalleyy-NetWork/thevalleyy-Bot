import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("packages")
        .setContexts([0])
        .setDescription("Zeigt alle installierten NPM-Packages an.")
        .setDescriptionLocalizations({
            "en-US": "Shows all installed npm packages",
            "en-GB": "Shows all installed npm packages",
        }),
};
