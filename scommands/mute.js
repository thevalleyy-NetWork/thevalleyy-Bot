import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.mute;

export default {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addUserOption((option) =>
            option.setName("user").setDescription(localization.user.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.user.de,
            })
        )
        .addStringOption((option) =>
            option
                .setName("duration")
                .setDescription(localization.duration.description.en)
                .setRequired(true)
                .setDescriptionLocalizations({
                    "de": localization.duration.description.de,
                })
                .addChoices(
                    {
                        name: localization.duration.choices.permanent.en,
                        name_localizations: {
                            "de": localization.duration.choices.permanent.de,
                        },
                        value: "0",
                    },
                    {
                        name: localization.duration.choices["1min"].en,
                        name_localizations: {
                            "de": localization.duration.choices["1min"].de,
                        },
                        value: "1",
                    },
                    {
                        name: localization.duration.choices["5min"].en,
                        name_localizations: {
                            "de": localization.duration.choices["5min"].de,
                        },
                        value: "5",
                    },
                    {
                        name: localization.duration.choices["10min"].en,
                        name_localizations: {
                            "de": localization.duration.choices["10min"].de,
                        },
                        value: "10",
                    },
                    {
                        name: localization.duration.choices["30min"].en,
                        name_localizations: {
                            "de": localization.duration.choices["30min"].de,
                        },
                        value: "30",
                    },
                    {
                        name: localization.duration.choices["1h"].en,
                        name_localizations: {
                            "de": localization.duration.choices["1h"].de,
                        },
                        value: "60",
                    },
                    {
                        name: localization.duration.choices["2h"].en,
                        name_localizations: {
                            "de": localization.duration.choices["2h"].de,
                        },
                        value: "120",
                    },
                    {
                        name: localization.duration.choices["4h"].en,
                        name_localizations: {
                            "de": localization.duration.choices["4h"].de,
                        },
                        value: "240",
                    },
                    {
                        name: localization.duration.choices["12h"].en,
                        name_localizations: {
                            "de": localization.duration.choices["12h"].de,
                        },
                        value: "720",
                    },
                    {
                        name: localization.duration.choices["1d"].en,
                        name_localizations: {
                            "de": localization.duration.choices["1d"].de,
                        },
                        value: "1440",
                    },
                    {
                        name: localization.duration.choices["2d"].en,
                        name_localizations: {
                            "de": localization.duration.choices["2d"].de,
                        },
                        value: "2880",
                    },
                    {
                        name: localization.duration.choices["1w"].en,
                        name_localizations: {
                            "de": localization.duration.choices["1w"].de,
                        },
                        value: "10080",
                    },
                    {
                        name: localization.duration.choices["2w"].en,
                        name_localizations: {
                            "de": localization.duration.choices["2w"].de,
                        },
                        value: "20160",
                    },
                    {
                        name: localization.duration.choices["1m"].en,
                        name_localizations: {
                            "de": localization.duration.choices["1m"].de,
                        },
                        value: "40320",
                    }
                )
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription(localization.reason.en).setRequired(true).setDescriptionLocalizations({
                "de": localization.reason.de,
            })
        ),
};
