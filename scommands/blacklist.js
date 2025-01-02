import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.blacklist;

export default {
    adminOnly: true,
    data: new SlashCommandBuilder()
        .setName("blacklist")
        .setDescription(localization.description.en)
        .setContexts([0, 1])
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addUserOption((option) =>
            option.setName("user").setDescription(localization.user.en).setDescriptionLocalizations({
                "de": localization.user.de,
            })
        ),
};
