import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("pi")
        .setContexts([0])
        .setDescription("Gibt Pi aus.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Prints Pi",
            "en-GB": "Prints Pi",
        })
        .addNumberOption((option) =>
            option.setName("digits").setDescription("Anzahl der Stellen").setDescriptionLocalizations({
                "en-US": "Number of digits",
                "en-GB": "Number of digits",
            })
        )

        .addBooleanOption((option) =>
            option.setName("hexadecimal").setDescription("Hexadezimal ausgeben?").setDescriptionLocalizations({
                "en-US": "Print in hexadecimal?",
                "en-GB": "Print in hexadecimal?",
            })
        ),
};
