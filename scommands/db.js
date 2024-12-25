import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.db;

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("db")
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("query").setDescription(localization.query.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.query.de,
            })
        ),
};
