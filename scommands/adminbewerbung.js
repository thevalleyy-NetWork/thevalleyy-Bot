import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("adminbewerbung")
        .setContexts([0])
        .setDescription("Du willst auch so ne coole rote Rolle? Hier kannst du dich bewerben!")
        .setDescriptionLocalizations({
            "en-US": "Apply for admin",
            "en-GB": "Apply for admin",
        }),
};
