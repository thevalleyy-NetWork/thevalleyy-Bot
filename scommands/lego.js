const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lego")
        .setDMPermission(false)
        .setDescription("Alle möglichen Infos zu LEGO-bezogenen Themen")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Some info about lego sets and other things",
            "en-GB": "Some info about lego sets and other things",
        })

        .addSubcommand((subcommand) =>
            subcommand
                .setName("set")
                .setDescription("Infos über ein bestimmtes Lego-Set")
                .setDescriptionLocalizations({
                    "en-US": "Information about a specific Lego set",
                    "en-GB": "Information about a specific Lego set",
                })
                .addStringOption((option) =>
                    option
                        .setName("query")
                        .setRequired(true)
                        .setDescription(
                            "Suchanfrage (z. B. die Setnummer, Begriffe & Themen, ect."
                        )
                        .setDescriptionLocalizations({
                            "en-US":
                                "Search query (e.g. the set number, keywords & themes, etc.)",
                            "en-GB":
                                "Search query (e.g. the set number, keywords & themes, etc.)",
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("theme")
                .setDescription("Infos über ein bestimmtes Lego-Theme")
                .setDescriptionLocalizations({
                    "en-US": "Information about a specific Lego theme",
                    "en-GB": "Information about a specific Lego theme",
                })
                .addStringOption((option) =>
                    option
                        .setName("theme")
                        .setDescription("Theme (z. B. Star Wars, Technic, ect.")
                        .setDescriptionLocalizations({
                            "en-US": "Theme (e.g. Star Wars, Technic, etc.)",
                            "en-GB": "Theme (e.g. Star Wars, Technic, etc.)",
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("subtheme")
                .setDescription("Alle Subthemes eines bestimmten Themes")
                .setDescriptionLocalizations({
                    "en-US": "All subthemes of a specific theme",
                    "en-GB": "All subthemes of a specific theme",
                })
                .addStringOption((option) =>
                    option
                        .setName("theme")
                        .setRequired(true)
                        .setDescription(
                            "Theme (z. B. Star Wars, Technic, ect.) Anzeigen alles Themes mit /lego themes"
                        )
                        .setDescriptionLocalizations({
                            "en-US":
                                "Theme (e.g. Star Wars, Technic, etc.) Display all themes with /lego themes",
                            "en-GB":
                                "Theme (e.g. Star Wars, Technic, etc.) Display all themes with /lego themes",
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("instructions")
                .setDescription("Anleitungen zu einem spezifischen Set")
                .setDescriptionLocalizations({
                    "en-US": "Instructions for a specific set",
                    "en-GB": "Instructions for a specific set",
                })
                .addStringOption((option) =>
                    option
                        .setName("setnumber")
                        .setRequired(true)
                        .setDescription("Setnummer (z. B. 75292)")
                        .setDescriptionLocalizations({
                            "en-US": "Set number (e.g. 75292)",
                            "en-GB": "Set number (e.g. 75292)",
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("images")
                .setDescription("Bilder zu einem spezifischen Set")
                .setDescriptionLocalizations({
                    "en-US": "Images of a specific set",
                    "en-GB": "Images of a specific set",
                })
                .addStringOption((option) =>
                    option
                        .setName("setnumber")
                        .setRequired(true)
                        .setDescription("Setnummer (z. B. 75292)")
                        .setDescriptionLocalizations({
                            "en-US": "Set number (e.g. 75292)",
                            "en-GB": "Set number (e.g. 75292)",
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("year")
                .setDescription(
                    "Infos darüber, welche Sets eines Themes wie oft erschienen sind"
                )
                .setDescriptionLocalizations({
                    "en-US":
                        "Information about how often a set of a specific theme has been released",
                    "en-GB":
                        "Information about how often a set of a specific theme has been released",
                })

                .addStringOption((option) =>
                    option
                        .setName("theme")
                        .setRequired(true)
                        .setDescription(
                            "Theme (z. B. Star Wars, Technic, ect.) Anzeigen alles Themes mit /lego themes"
                        )
                        .setDescriptionLocalizations({
                            "en-US":
                                "Theme (e.g. Star Wars, Technic, etc.) Display all themes with /lego themes",
                            "en-GB":
                                "Theme (e.g. Star Wars, Technic, etc.) Display all themes with /lego themes",
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("review")
                .setDescription(
                    "Rezensionen von Brickset.com Nutzern zu einem spezifischen Set"
                )
                .setDescriptionLocalizations({
                    "en-US":
                        "Reviews of a specific set by users of Brickset.com",
                    "en-GB":
                        "Reviews of a specific set by users of Brickset.com",
                })
                .addStringOption((option) =>
                    option
                        .setName("setnumber")
                        .setRequired(true)
                        .setDescription("Setnummer (z. B. 75292)")
                        .setDescriptionLocalizations({
                            "en-US": "Set number (e.g. 75292)",
                            "en-GB": "Set number (e.g. 75292)",
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("api")
                .setDescription("API-Statistik für den API-Key des Bots")
                .setDescriptionLocalizations({
                    "en-US": "API stats for the API key of the bot",
                    "en-GB": "API stats for the API key of the bot",
                })
        ),
};
