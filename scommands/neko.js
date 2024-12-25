import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.neko;

export default {
    data: new SlashCommandBuilder()
        .setName("neko")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription(localization.type.description.en)
                .setDescriptionLocalizations({
                    "de": localization.type.description.de,
                })
                .addChoices(
                    {
                        name: localization.type.choices.Hug.en,
                        name_localizations: {
                            "de": localization.type.choices.Hug.de, //TODO: this doesnt work
                        },
                        value: "hug",
                    },
                    {
                        name: localization.type.choices.Cry.en,
                        name_localizations: {
                            "de": localization.type.choices.Cry.de,
                        },
                        value: "cry",
                    },
                    {
                        name: localization.type.choices.Smug.en,
                        name_localizations: {
                            "de": localization.type.choices.Smug.de,
                        },
                        value: "smug",
                    },
                    {
                        name: localization.type.choices.Slap.en,
                        name_localizations: {
                            "de": localization.type.choices.Slap.de,
                        },
                        value: "slap",
                    },
                    {
                        name: localization.type.choices.Pat.en,
                        name_localizations: {
                            "de": localization.type.choices.Pat.de,
                        },
                        value: "pat",
                    },
                    {
                        name: localization.type.choices.Laugh.en,
                        name_localizations: {
                            "de": localization.type.choices.Laugh.de,
                        },
                        value: "laugh",
                    },
                    {
                        name: localization.type.choices.Feed.en,
                        name_localizations: {
                            "de": localization.type.choices.Feed.de,
                        },
                        value: "feed",
                    },
                    {
                        name: localization.type.choices.Cuddle.en,
                        name_localizations: {
                            "de": localization.type.choices.Cuddle.de,
                        },
                        value: "cuddle",
                    }
                )
        ),
};
