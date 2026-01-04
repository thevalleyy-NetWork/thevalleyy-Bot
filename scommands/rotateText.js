import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.rotateText;

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("rotatetext")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            de: localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("text").setDescription(localization.text.en).setRequired(true).setDescriptionLocalizations({
                de: localization.text.de,
            })
        ),
};
