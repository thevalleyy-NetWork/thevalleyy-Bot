import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.status;

export default {
    adminOnly: true,
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("status")
        .setContexts([0, 1])
        .setDescription(localization.description.en)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addStringOption((option) =>
            option
                .setName("presence")
                .setDescription(localization.presence.description.en)
                .setRequired(true)
                .setDescriptionLocalizations({
                    "de": localization.presence.description.de,
                })
                .addChoices(
                    { name: localization.presence.choices.Online.en, name_localizations: {"de": localization.presence.choices.Online.de}, value: "online" },
                    { name: localization.presence.choices.Idle.en, name_localizations: {"de": localization.presence.choices.Idle.de}, value: "idle" },
                    { name: localization.presence.choices.DND.en, name_localizations: {"de": localization.presence.choices.DND.de}, value: "dnd" },
                    { name: localization.presence.choices.Invisible.en, name_localizations: {"de": localization.presence.choices.Invisible.de}, value: "invisible" },
                    { name: localization.presence.choices.Streaming.en, name_localizations: {"de": localization.presence.choices.Streaming.de}, value: "streaming" }
                )
        )
        .addStringOption((option) =>
            option.setName("text").setDescription(localization.text.en).setDescriptionLocalizations({
                "de": localization.text.de,
            })
        )
        .addStringOption((option) =>
            option
                .setName("activity")
                .setDescription(localization.activity.description.en)
                .setDescriptionLocalizations({
                    "de": localization.activity.description.de,
                })
                .addChoices(
                    { name: localization.activity.choices.Competing.en, name_localizations: {"de": localization.activity.choices.Competing.de}, value: "Competing" },
                    { name: localization.activity.choices.Listening.en, name_localizations: {"de": localization.activity.choices.Listening.de}, value: "Listening" },
                    { name: localization.activity.choices.Playing.en, name_localizations: {"de": localization.activity.choices.Playing.de}, value: "Playing" },
                    { name: localization.activity.choices.Watching.en, name_localizations: {"de": localization.activity.choices.Watching.de}, value: "Watching" }
                )
        ),
};
