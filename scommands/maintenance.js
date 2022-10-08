const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("maintenance")
        .setDescription("Setzt den Bot in den Wartungsmodus.")
        .setDescriptionLocalizations({
            "en-US": "Activates maintenance mode",
            "en-GB": "Activates maintenance mode",
        })
        .addBooleanOption((option) =>
            option
                .setName("maintenance")
                .setDescription("Wartungsmodus")
                .setRequired(true)
                .setDescriptionLocalizations({
                    "en-US": "Maintenance mode",
                    "en-GB": "Maintenance mode",
                })
        )

        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Grund")
                .setDescriptionLocalizations({
                    "en-US": "Reason",
                    "en-GB": "Reason",
                })
        ),
};
