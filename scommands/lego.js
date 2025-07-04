import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.lego;

export default {
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName("lego")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })

        .addSubcommand((subcommand) =>
            subcommand
                .setName("set")
                .setDescription(localization.set.description.en)
                .setDescriptionLocalizations({
                    "de": localization.set.description.de,
                })
                .addStringOption((option) =>
                    option
                        .setName("query")
                        .setRequired(true)
                        .setDescription(localization.set.query.en)
                        .setDescriptionLocalizations({
                            "de": localization.set.query.de,
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("theme")
                .setDescription(localization.theme.description.en)
                .setDescriptionLocalizations({
                    "de": localization.theme.description.de,
                })
                .addStringOption((option) =>
                    option.setName("theme").setDescription(localization.theme.theme.en).setDescriptionLocalizations({
                        "de": localization.theme.theme.de,
                    })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("subtheme")
                .setDescription(localization.subtheme.description.en)
                .setDescriptionLocalizations({
                    "de": localization.subtheme.description.de,
                })
                .addStringOption((option) =>
                    option
                        .setName("theme")
                        .setRequired(true)
                        .setDescription(localization.subtheme.theme.en)
                        .setDescriptionLocalizations({
                            "de": localization.subtheme.theme.de,
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("instructions")
                .setDescription(localization.instructions.description.en)
                .setDescriptionLocalizations({
                    "de": localization.instructions.description.de,
                })
                .addStringOption((option) =>
                    option.setName("setnumber").setRequired(true).setDescription(localization.instructions.setnumber.en).setDescriptionLocalizations({
                        "de": localization.instructions.setnumber.de,
                    })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("images")
                .setDescription(localization.images.description.en)
                .setDescriptionLocalizations({
                    "de": localization.images.description.de,
                })
                .addStringOption((option) =>
                    option.setName("setnumber").setRequired(true).setDescription(localization.images.setnumber.en).setDescriptionLocalizations({
                        "de": localization.images.setnumber.de,
                    })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("year")
                .setDescription(localization.year.description.en)
                .setDescriptionLocalizations({
                    "de": localization.year.description.de,
                })

                .addStringOption((option) =>
                    option
                        .setName("theme")
                        .setRequired(true)
                        .setDescription(localization.year.theme.en)
                        .setDescriptionLocalizations({
                            "de": localization.year.theme.de,
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("review")
                .setDescription(localization.review.description.en)
                .setDescriptionLocalizations({
                    "de": localization.review.description.de,
                })
                .addStringOption((option) =>
                    option.setName("setnumber").setRequired(true).setDescription(localization.review.setnumber.en).setDescriptionLocalizations({
                        "de": localization.review.setnumber.de,
                    })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand.setName("api").setDescription(localization.api.description.en).setDescriptionLocalizations({
                "de": localization.api.description.de,
            })
        ),
};
