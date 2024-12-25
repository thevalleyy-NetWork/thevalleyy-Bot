import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.blacklist;

export default {
    data: new SlashCommandBuilder()
        .setName("blacklist")
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        }) //TODO: admin only
        .addUserOption((option) =>
            option.setName("user").setDescription(localization.user.en).setDescriptionLocalizations({
                "de": localization.user.de,
            })
        ),
};
