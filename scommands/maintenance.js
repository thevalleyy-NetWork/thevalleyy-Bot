import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.maintenance;

export default {
    data: new SlashCommandBuilder()
        .setName("maintenance")
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addBooleanOption((option) =>
            option.setName("maintenance").setDescription(localization.maintenance.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.maintenance.de,
            })
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription(localization.reason.en).setDescriptionLocalizations({
                "de": localization.reason.de,
            })
        ),
};
