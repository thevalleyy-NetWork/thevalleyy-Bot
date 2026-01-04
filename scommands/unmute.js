import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.unmute;

export default {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDescriptionLocalizations({
            de: localization.description.de,
        })
        .addUserOption((option) =>
            option.setName("user").setDescription(localization.user.en).setRequired(true).setDescriptionLocalizations({
                de: localization.user.de,
            })
        )

        .addStringOption((option) =>
            option.setName("reason").setDescription(localization.reason.en).setRequired(true).setDescriptionLocalizations({
                de: localization.reason.de,
            })
        ),
};
