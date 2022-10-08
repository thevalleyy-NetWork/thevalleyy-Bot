const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Setzt einen Bot-Status")
        .setDescriptionLocalizations({
            "en-US": "Sets a presence",
            "en-GB": "Sets a presence",
        })
        .addStringOption((option) =>
            option
                .setName("presence")
                .setDescription("Status-Typ")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Presence type",
                    "en-GB": "Presence type",
                })
                .addChoices(
                    { name: "Online", value: "online" },
                    { name: "Idle", value: "idle" },
                    { name: "Do not disturb", value: "dnd" },
                    { name: "Invisible", value: "invisible" },
                    { name: "Streaming", value: "streaming" }
                )
        )

        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription("Text der angezeigt wird")
                .setDescriptionLocalizations({
                    "en-US": "Text to be shown",
                    "en-GB": "Text to be shown",
                })
        )

        .addStringOption((option) =>
            option
                .setName("activity")
                .setDescription("Status-Aktivität")
                .setDescriptionLocalizations({
                    "en-US": "Activity",
                    "en-GB": "Activity",
                })
                .addChoices(
                    { name: "Competing", value: "Competing" },
                    { name: "Listening", value: "Listening" },
                    { name: "Playing", value: "Playing" },
                    { name: "Watching", value: "Watching" }
                )
        ),
};
