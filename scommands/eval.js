import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.eval;

export default {
    adminOnly: true,
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription(localization.description.en)
        .setContexts([0, 1])
        .setDescriptionLocalizations({
            de: localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("code").setDescription(localization.code.en).setRequired(true).setDescriptionLocalizations({
                de: localization.code.de,
            })
        )
        .addBooleanOption((option) =>
            option.setName("ephemeral").setDescription(localization.ephemeral.en).setRequired(false).setDescriptionLocalizations({
                de: localization.ephemeral.de,
            })
        ),
};
