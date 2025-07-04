import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.bettereval;

export default {
    adminOnly: true,
    data: new SlashCommandBuilder()
        .setName("bettereval")
        .setContexts([0, 1])
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("code").setDescription(localization.code.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.code.de,
            })
        ),
};
