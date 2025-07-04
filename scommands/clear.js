import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.clear;

export default {
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName("clear")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addNumberOption((option) =>
            option
                .setName("number")
                .setDescription(localization.number.en)
                .setRequired(true)
                .setDescriptionLocalizations({
                    "de": localization.number.de,
                })
        ),
};
