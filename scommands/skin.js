import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.skin;

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("skin")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            de: localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("player").setDescription(localization.player.en).setRequired(true).setDescriptionLocalizations({
                de: localization.player.de,
            })
        ),
};
