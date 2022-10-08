const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("photo")
        .setDMPermission(false)
        .setDescription("Sucht nach Fotos im Internet.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Searches the internet for photos",
            "en-GB": "Searches the internet for photos",
        })
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("Suchanfrage")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Search query",
                    "en-GB": "Search query",
                })
        )

        .addStringOption((option) =>
            option
                .setName("orientation")
                .setDescription("Ausrichtung des Fotos")
                .setDescriptionLocalizations({
                    "en-US": "Orientation of the photo",
                    "en-GB": "Orientation of the photo",
                })
                .addChoices(
                    { name: "Landscape", value: "landscape" },
                    { name: "Portrait", value: "portrait" },
                    { name: "Square", value: "square" }
                )
        )

        .addStringOption((option) =>
            option
                .setName("size")
                .setDescription("Minimalgröße des Fotos")
                .setDescriptionLocalizations({
                    "en-US": "Minimum size of the photo",
                    "en-GB": "Minimum size of the photo",
                })
                .addChoices(
                    { name: "Large (24 MP)", value: "large" },
                    { name: "Medium (12 MP)", value: "medium" },
                    { name: "Small (4MP)", value: "small" }
                )
        )

        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription("Durchschnittliche Farbe des Fotos")
                .setDescriptionLocalizations({
                    "en-US": "Average color of the photo",
                    "en-GB": "Average color of the photo",
                })
                .addChoices(
                    { name: "red", value: "red" },
                    { name: "orange", value: "orange" },
                    { name: "yellow", value: "yellow" },
                    { name: "green", value: "green" },
                    { name: "turquoise", value: "turquoise" },
                    { name: "blue", value: "blue" },
                    { name: "violet", value: "violet" },
                    { name: "pink", value: "pink" },
                    { name: "white", value: "white" },
                    { name: "gray", value: "gray" },
                    { name: "black", value: "black" },
                    { name: "brown", value: "brown" }
                )
        )

        .addStringOption((option) =>
            option
                .setName("locale")
                .setDescription("Sprache der Suchanfrage")
                .setDescriptionLocalizations({
                    "en-US": "Language of the search query",
                    "en-GB": "Language of the search query",
                })
                .addChoices(
                    { name: "English", value: "en-US" },
                    { name: "Deutsch", value: "de-DE" },
                    { name: "Français", value: "fr-FR" },
                    { name: "Italiano", value: "it-IT" },
                    { name: "Español", value: "es-ES" },
                    { name: "Português", value: "pt-BR" },
                    { name: "Polski", value: "pl-PL" },
                    { name: "Dansk", value: "da-DK" }
                )
        ),
};
