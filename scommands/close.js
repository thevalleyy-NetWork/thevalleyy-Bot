import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("close").setContexts([0]).setDescription("Schließt ein geöffnetes Ticket").setDescriptionLocalizations({
        "en-US": "Closes an open ticket",
        "en-GB": "Closes an open ticket",
    }),
};
