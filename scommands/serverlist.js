import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.serverlist;

export default {
    adminOnly: true,
    data: new SlashCommandBuilder().setName("serverlist").setContexts([0, 1]).setDescription(localization.description.en).setDescriptionLocalizations({
        "de": localization.description.de,
    }),
};
