import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.adminbewerbung;

export default {
    data: new SlashCommandBuilder().setName("adminbewerbung").setContexts([0]).setDescription(localization.description.en).setDescriptionLocalizations({
        de: localization.description.de,
    }),
};
