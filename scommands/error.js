import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with { type: "json" };
const localization = strings.slashCommands.error;

export default {
    adminOnly: true,
    data: new SlashCommandBuilder()
        .setName("error")
        .setContexts([0, 1])
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            de: localization.description.de,
        })
        .addSubcommand((subcommand) =>
            subcommand
                .setName("list")
                .setDescription(localization.list.description.en)
                .setDescriptionLocalizations({
                    de: localization.list.description.de,
                })
                .addNumberOption((option) =>
                    option.setName("id").setDescription(localization.list.id.en).setDescriptionLocalizations({
                        de: localization.list.id.de,
                    })
                )
                .addNumberOption((option) =>
                    option.setName("amount").setDescription(localization.list.amount.en).setDescriptionLocalizations({
                        de: localization.list.amount.de,
                    })
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("insert")
                .setDescription(localization.insert.description.en)
                .setDescriptionLocalizations({
                    de: localization.insert.description.de,
                })

                .addStringOption((option) =>
                    option.setName("message").setRequired(true).setDescription(localization.insert.message.en).setDescriptionLocalizations({
                        de: localization.insert.message.de,
                    })
                )
                .addStringOption((option) =>
                    option.setName("origin").setDescription(localization.insert.origin.en).setDescriptionLocalizations({
                        de: localization.insert.origin.de,
                    })
                )
        ),
};
