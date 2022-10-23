const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDMPermission(false)
        .setDescription("Hilfe-Menü")
        .setDescriptionLocalizations({
            "en-US": "Displays the help menu for this bot",
            "en-GB": "Displays the help menu for this bot",
        })
        .addSubcommand((subcommand) =>
            subcommand
                .setName("command")
                .setDescription("Hilfe zu einem bestimmten Command")
                .setDescriptionLocalizations({
                    "en-US": "Help for a specific command",
                    "en-GB": "Help for a specific command",
                })
                .addStringOption((option) =>
                    option
                        .setName("command")
                        .setDescription(
                            "Der Command für den du Hilfe benötigst"
                        )
                        .setDescriptionLocalizations({
                            "en-US": "The command you want to get help for",
                            "en-GB": "The command you want to get help for",
                        })
                        .setAutocomplete(true)
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("about")
                .setDescription("Hier findest du alle Credits für den Bot")
                .setDescriptionLocalizations({
                    "en-US": "Here you can find all credits for the bot",
                    "en-GB": "Here you can find all credits for the bot",
                })
        ),
};
