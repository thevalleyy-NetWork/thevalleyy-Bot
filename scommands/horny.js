import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.horny;

export default {
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName("horny")
        .setContexts([0])
        .setDescription(localization.description["en-US"])
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            de: localization.description["de"],
            "en-GB": localization.description["en-GB"],
        })
        .addUserOption((option) =>
            option.setName("user").setDescription(localization.user["en-US"]).setDescriptionLocalizations({
                de: localization.user["de"],
                "en-GB": localization.user["en-GB"],
            }),
        ),
};
