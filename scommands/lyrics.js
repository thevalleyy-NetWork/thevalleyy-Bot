import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setContexts([0])
        .setDescription("Zeigt dir den Songtext eines Songs an.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Shows the lyrics of a given song",
            "en-GB": "Shows the lyrics of a given song",
        })

        .addStringOption((option) =>
            option.setName("song").setDescription("Der Song, dessen Songtext du sehen möchtest.").setRequired(true).setDescriptionLocalizations({
                "en-US": "The song you want to see the lyrics of",
                "en-GB": "The song you want to see the lyrics of",
            })
        ),
};
