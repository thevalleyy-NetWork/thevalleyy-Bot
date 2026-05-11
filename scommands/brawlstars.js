import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.brawlstars;

export default {
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName("brawlstars")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            de: localization.description["de"],
        })
        .addStringOption((option) =>
            option.setName("id").setRequired(true).setDescription(localization.id.en).setDescriptionLocalizations({
                de: localization.id.de,
            }),
        ),
};
