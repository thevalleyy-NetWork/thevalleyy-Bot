import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("text")
        .setContexts([0])
        .setDescription("Lässt den Bot einen Text senden.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Let the bot say something",
            "en-GB": "Let the bot say something",
        })
        .addStringOption((option) =>
            option.setName("text").setDescription("Text, der gesendet werden soll").setRequired(true).setDescriptionLocalizations({
                "en-US": "Text to send",
                "en-GB": "Text to send",
            })
        ),
};
