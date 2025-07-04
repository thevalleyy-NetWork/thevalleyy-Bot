import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.games;

export default {
    data: new SlashCommandBuilder()
        .setName("games")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) 
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("game").setDescription(localization.description.en).setDescriptionLocalizations({
                "de": localization.description.de,
            })
        ),
};
