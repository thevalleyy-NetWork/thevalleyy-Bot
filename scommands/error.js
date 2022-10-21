const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("error")
        .setDMPermission(true)
        .setDescription("Zugriff auf die Error-DB.")
        .setDescriptionLocalizations({
            "en-US": "Do something with the error log.",
            "en-GB": "Do something with the error log.",
        })
        .addSubcommand((subcommand) =>
            subcommand
                .setName("list")
                .setDescription("Listet die letzten n Errors auf.")
                .setDescriptionLocalizations({
                    "en-US": "Lists the last n errors.",
                    "en-GB": "Lists the last n errors.",
                })
                .addNumberOption((option) =>
                    option
                        .setName("amount")
                        .setDescription(
                            "Die Anzahl der Errors, die aufgelistet werden sollen."
                        )
                        .setDescriptionLocalizations({
                            "en-US": "The amount of errors to be listed.",
                            "en-GB": "The amount of errors to be listed.",
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
