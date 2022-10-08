const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("db")
        .setDescription("Zugang zur Bot-Datenbank")
        .setDescriptionLocalizations({
            "en-US": "Access the bot database",
            "en-GB": "Access the bot database",
        })
        .addStringOption((option) =>
            option
                .setName("sql")
                .setDescription("SQL-Anfrage")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "SQL query",
                    "en-GB": "SQL query",
                })
        ),
};
