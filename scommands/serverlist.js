import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.serverlist;

export default {
    data: new SlashCommandBuilder().setName("serverlist").setDescription(localization.description.en).setDescriptionLocalizations({
        "de": localization.description.de,
    }),
};
