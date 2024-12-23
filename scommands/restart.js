import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("restart").setDescription("Startet den Bot neu.").setDescriptionLocalizations({
        "en-US": "Restarts the bot",
        "en-GB": "Restarts the bot",
    }),
};
