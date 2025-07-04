import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.lyrics;

export default {
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })

        .addStringOption((option) =>
            option.setName("song").setDescription(localization.song.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.song.de,
            })
        ),
};
