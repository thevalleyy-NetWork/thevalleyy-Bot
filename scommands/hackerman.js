import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.hackerman;

export default {
    data: new SlashCommandBuilder()
        .setName("hackerman")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription(localization.text.en)
                .setRequired(true)
                .setDescriptionLocalizations({
                    "de": localization.text.de,
                })
        ),
};
