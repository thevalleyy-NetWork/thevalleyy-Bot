import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.help;

export default {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName("help")
        .setContexts([0, 1])
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addSubcommand((subcommand) =>
            subcommand
                .setName("command")
                .setDescription(localization.command.description.en)
                .setDescriptionLocalizations({
                    "de": localization.command.description.de,
                })
                .addStringOption((option) =>
                    option
                        .setName("command")
                        .setDescription(localization.command.command.en)
                        .setDescriptionLocalizations({
                            "de": localization.command.command.de,
                        })
                        .setAutocomplete(true)
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("about").setDescription(localization.about.description.en).setDescriptionLocalizations({
                "de": localization.about.description.de,
            })
        ),
};
