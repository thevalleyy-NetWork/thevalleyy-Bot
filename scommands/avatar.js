import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.avatar;

export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            de: localization.description.de,
        })
        .addUserOption((option) =>
            option.setName("user").setDescription(localization.user.en).setDescriptionLocalizations({
                de: localization.user.de,
            })
        ),
};
