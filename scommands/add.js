import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.add;

export default {
    data: new SlashCommandBuilder()
        .setName("add")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addNumberOption((option) =>
            option.setName("number1").setDescription(localization.number1.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.number1.de,
            })
        )
        .addNumberOption((option) =>
            option.setName("number2").setDescription(localization.number2.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.number2.de,
            })
        )
};
