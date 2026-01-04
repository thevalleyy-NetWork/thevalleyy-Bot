import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.mc;

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("mc")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            de: localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("ip").setDescription(localization.ip.en).setDescriptionLocalizations({
                de: localization.ip.de,
            })
        )
        .addStringOption((option) =>
            option.setName("port").setDescription(localization.port.en).setDescriptionLocalizations({
                de: localization.port.de,
            })
        ),
};
