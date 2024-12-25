import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.test;

export default {
    data: new SlashCommandBuilder()
        .setName("test")
        .setContexts([0, 1])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(0)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        }),
};
