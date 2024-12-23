import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("games")
        .setContexts([0])
        .setDescription("Spiele-Menü")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Game menu",
            "en-GB": "Game menu",
        })
        .addStringOption((option) =>
            option.setName("game").setDescription("Das Spiel, welches du spielen möchtest").setDescriptionLocalizations({
                "en-US": "The game you want to play",
                "en-GB": "The game you want to play",
            })
        ),
};
