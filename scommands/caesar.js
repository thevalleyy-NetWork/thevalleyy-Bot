import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.caesar;

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("caesar")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) 
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("text").setDescription(localization.text.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.text.de,
            })
        )
        .addNumberOption((option) =>
            option.setName("key").setDescription(localization.key.en).setDescriptionLocalizations({
                "de": localization.key.de,
            })
        )
        .addBooleanOption((option) =>
            option.setName("decrypt").setDescription(localization.decrypt.en).setDescriptionLocalizations({
                "de": localization.decrypt.de,
            })
        )
        .addBooleanOption((option) =>
            option.setName("specialchars").setDescription(localization.specialchars.en).setDescriptionLocalizations({
                "de": localization.specialchars.de,
            })
        ),
};
