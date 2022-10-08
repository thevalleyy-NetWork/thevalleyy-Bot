const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("adminbewerbung")
        .setDMPermission(false)
        .setDescription(
            "Du willst auch so ne coole rote Rolle? Hier kannst du dich bewerben!"
        )
        .setDescriptionLocalizations({
            "en-US": "Apply for admin",
            "en-GB": "Apply for admin",
        }),
};
