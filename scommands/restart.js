import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.restart;

export default {
    data: new SlashCommandBuilder().setName("restart").setDescription(localization.description.en).setDescriptionLocalizations({
        "de": localization.description.de,
    }),
};
