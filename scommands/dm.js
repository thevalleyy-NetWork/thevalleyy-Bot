import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.dm;

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers) // TODO: admin only
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addUserOption((option) =>
            option.setName("user").setDescription(localization.user.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.user.de,
            })
        )

        .addStringOption((option) =>
            option.setName("content").setDescription(localization.content.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.content.de,
            })
        ),
};
