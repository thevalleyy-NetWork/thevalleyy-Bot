const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("blacklist")
        .setDescription("Blacklistet einen User oder gibt die Blackliste aus")
        .setDescriptionLocalizations({
            "en-US": "Blacklists a user or shows all blacklisted users",
            "en-GB": "Blacklists a user or shows all blacklisted users",
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Nutzer, der geblacklistet werden soll")
                .setDescriptionLocalizations({
                    "en-US": "User to be blacklisted",
                    "en-GB": "User to be blacklisted",
                })
        ),
};
