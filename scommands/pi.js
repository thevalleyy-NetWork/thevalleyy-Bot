import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.pi;

export default {
    data: new SlashCommandBuilder()
        .setName("pi")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addNumberOption((option) =>
            option.setName("digits").setDescription(localization.digits.en).setDescriptionLocalizations({
                "de": localization.digits.de,
            })
        )
        .addNumberOption((option) =>
            option.setName("start").setDescription(localization.start.en).setDescriptionLocalizations({
                "de": localization.start.de,
            })
        )
        .addBooleanOption((option) =>
            option.setName("hexadecimal").setDescription(localization.hexadecimal.en).setDescriptionLocalizations({
                "de": localization.hexadecimal.de,
            })
        ),
};
