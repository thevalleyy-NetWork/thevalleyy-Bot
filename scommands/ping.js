import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.ping;

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setContexts([0, 1])
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de
        }),
};
