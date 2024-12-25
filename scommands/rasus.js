import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.rasus;

export default {
    data: new SlashCommandBuilder().setName("rasus").setContexts([0]).setDescription(localization.description.en).setDescriptionLocalizations({
        "de": localization.description.de,
    })
};
