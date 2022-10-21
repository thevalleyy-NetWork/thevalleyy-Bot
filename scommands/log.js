const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("log")
        .setDMPermission(true)
        .setDescription("Zugriff auf die Log-DB")
        .setDescriptionLocalizations({
            "en-US": "Do something with the log.",
            "en-GB": "Do something with the log.",
        })
        .addSubcommand((subcommand) =>
            subcommand
                .setName("list")
                .setDescription("Listet die letzten n Logs auf.")
                .setDescriptionLocalizations({
                    "en-US": "Lists the last n logs.",
                    "en-GB": "Lists the last n logs.",
                })
                .addNumberOption((option) =>
                    option
                        .setName("amount")
                        .setDescription(
                            "Die Anzahl der Logs, die aufgelistet werden sollen."
                        )
                        .setDescriptionLocalizations({
                            "en-US": "The amount of logs to be listed.",
                            "en-GB": "The amount of logs to be listed.",
                        })
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("insert")
                .setDescription("Loggt eine Zeichenfolge in die Datenbank.")
                .setDescriptionLocalizations({
                    "en-US": "Logs a string to the database.",
                    "en-GB": "Logs a string to the database.",
                })

                .addStringOption((option) =>
                    option
                        .setName("message")
                        .setRequired(true)
                        .setDescription(
                            "Die Zeichenfolge, die in die Datenbank eingetragen werden soll."
                        )
                        .setDescriptionLocalizations({
                            "en-US": "String to log.",
                            "en-GB": "String to log.",
                        })
                )

                .addBooleanOption((option) =>
                    option
                        .setName("modlog")
                        .setDescription(
                            "Soll diese Nachricht auch im Modlog geloggt werden?"
                        )
                        .setDescriptionLocalizations({
                            "en-US":
                                "Should this message be logged in the modlog?",
                            "en-GB":
                                "Should this message be logged in the modlog?",
                        })
                )
                .addStringOption((option) =>
                    option
                        .setName("origin")
                        .setDescription(
                            "Der Ursprung der Nachricht, z.B. der Name des Befehls."
                        )
                        .setDescriptionLocalizations({
                            "en-US": "The origin of the message.",
                            "en-GB": "The origin of the message.",
                        })
                )
        ),
};
