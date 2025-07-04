import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.photo;

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("photo")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option.setName("query").setDescription(localization.query.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.query.de,
            })
        )

        .addStringOption((option) =>
            option
                .setName("orientation")
                .setDescription(localization.orientation.description.en)
                .setDescriptionLocalizations({
                    "de": localization.orientation.description.de,
                })
                .addChoices(
                    {
                        name: localization.orientation.choices.Landscape.en,
                        name_localizations: {
                            "de": localization.orientation.choices.Landscape.de,
                        },
                        value: "landscape",
                    },
                    {
                        name: localization.orientation.choices.Portrait.en,
                        name_localizations: {
                            "de": localization.orientation.choices.Portrait.de,
                        },
                        value: "portrait",
                    },
                    {
                        name: localization.orientation.choices.Square.en,
                        name_localizations: {
                            "de": localization.orientation.choices.Square.de,
                        },
                        value: "square",
                    }
                )
        )

        .addStringOption((option) =>
            option
                .setName("size")
                .setDescription(localization.size.description.en)
                .setDescriptionLocalizations({
                    "de": localization.size.description.de,
                })
                .addChoices(
                    {
                        name: localization.size.choices.Large.en,
                        name_localizations: {
                            "de": localization.size.choices.Large.de,
                        },
                        value: "large",
                    },
                    {
                        name: localization.size.choices.Medium.en,
                        name_localizations: {
                            "de": localization.size.choices.Medium.de,
                        },
                        value: "medium",
                    },
                    {
                        name: localization.size.choices.Small.en,
                        name_localizations: {
                            "de": localization.size.choices.Small.de,
                        },
                        value: "small",
                    }
                )
        )

        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription(localization.color.description.en)
                .setDescriptionLocalizations({
                    "de": localization.color.description.de,
                })
                .addChoices(
                    {
                        name: localization.color.choices.red.en,
                        name_localizations: {
                            "de": localization.color.choices.red.de,
                        },
                        value: "red",
                    },
                    {
                        name: localization.color.choices.orange.en,
                        name_localizations: {
                            "de": localization.color.choices.orange.de,
                        },
                        value: "orange",
                    },
                    {
                        name: localization.color.choices.yellow.en,
                        name_localizations: {
                            "de": localization.color.choices.yellow.de,
                        },
                        value: "yellow",
                    },
                    {
                        name: localization.color.choices.green.en,
                        name_localizations: {
                            "de": localization.color.choices.green.de,
                        },
                        value: "green",
                    },
                    {
                        name: localization.color.choices.turquoise.en,
                        name_localizations: {
                            "de": localization.color.choices.turquoise.de,
                        },
                        value: "turquoise",
                    },
                    {
                        name: localization.color.choices.blue.en,
                        name_localizations: {
                            "de": localization.color.choices.blue.de,
                        },
                        value: "blue",
                    },
                    {
                        name: localization.color.choices.violet.en,
                        name_localizations: {
                            "de": localization.color.choices.violet.de,
                        },
                        value: "violet",
                    },
                    {
                        name: localization.color.choices.pink.en,
                        name_localizations: {
                            "de": localization.color.choices.pink.de,
                        },
                        value: "pink",
                    },
                    {
                        name: localization.color.choices.white.en,
                        name_localizations: {
                            "de": localization.color.choices.white.de,
                        },
                        value: "white",
                    },
                    {
                        name: localization.color.choices.gray.en,
                        name_localizations: {
                            "de": localization.color.choices.gray.de,
                        },
                        value: "gray",
                    },
                    {
                        name: localization.color.choices.black.en,
                        name_localizations: {
                            "de": localization.color.choices.black.de,
                        },
                        value: "black",
                    },
                    {
                        name: localization.color.choices.brown.en,
                        name_localizations: {
                            "de": localization.color.choices.brown.de,
                        },
                        value: "brown",
                    }
                )
        )

        .addStringOption((option) =>
            option
                .setName("locale")
                .setDescription(localization.locale.description.en)
                .setDescriptionLocalizations({
                    "de": localization.locale.description.de,
                })
                .addChoices(
                    {
                        name: localization.locale.choices.English.en,
                        name_localizations: {
                            "de": localization.locale.choices.English.de,
                        },
                        value: "en-US",
                    },
                    {
                        name: localization.locale.choices.Deutsch.en,
                        name_localizations: {
                            "de": localization.locale.choices.Deutsch.de,
                        },
                        value: "de",
                    },
                    {
                        name: localization.locale.choices.Francais.en,
                        name_localizations: {
                            "de": localization.locale.choices.Francais.de,
                        },
                        value: "fr-FR",
                    },
                    {
                        name: localization.locale.choices.Italiano.en,
                        name_localizations: {
                            "de": localization.locale.choices.Italiano.de,
                        },
                        value: "it-IT",
                    },
                    {
                        name: localization.locale.choices.Espanol.en,
                        name_localizations: {
                            "de": localization.locale.choices.Espanol.de,
                        },
                        value: "es-ES",
                    },
                    {
                        name: localization.locale.choices.Portugues.en,
                        name_localizations: {
                            "de": localization.locale.choices.Portugues.de,
                        },
                        value: "pt-BR",
                    },
                    {
                        name: localization.locale.choices.Polski.en,
                        name_localizations: {
                            "de": localization.locale.choices.Polski.de,
                        },
                        value: "pl-PL",
                    },
                    {
                        name: localization.locale.choices.Dansk.en,
                        name_localizations: {
                            "de": localization.locale.choices.Dansk.de,
                        },
                        value: "da-DK",
                    }
                )
        ),
};
