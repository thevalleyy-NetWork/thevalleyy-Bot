import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("caesar")
        .setContexts([0])
        .setDescription("Verschlüsselt einen Text mit dem Caesar-Algorithmus (Standard Key: 3)")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Encrypts a text with the Caesar algorithm (default key: 3)",
            "en-GB": "Encrypts a text with the Caesar algorithm (default key: 3)",
        })
        .addStringOption((option) =>
            option.setName("text").setDescription("Text").setRequired(true).setDescriptionLocalizations({
                "en-US": "Text to encrypt",
                "en-GB": "Text to encrypt",
            })
        )

        .addNumberOption((option) =>
            option.setName("key").setDescription("Schlüssel").setDescriptionLocalizations({
                "en-US": "Key",
                "en-GB": "Key",
            })
        )
        .addBooleanOption((option) =>
            option.setName("decrypt").setDescription("Entschlüsseln").setDescriptionLocalizations({
                "en-US": "Decrypt",
                "en-GB": "Decrypt",
            })
        )
        .addBooleanOption((option) =>
            option.setName("specialchars").setDescription("Dürfen Sonderzeichen verwendet werden? (Standard: Nein)").setDescriptionLocalizations({
                "en-US": "Can special characters be used?",
                "en-GB": "Can special characters be used?",
            })
        ),
};
