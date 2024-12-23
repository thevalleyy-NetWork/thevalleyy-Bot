import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("spotify")
        .setContexts([0])
        .setDescription("Infos darüber, was jemand gerade auf Spotify hört")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Info about what someone is listening to on Spotify",
            "en-GB": "Info about what someone is listening to on Spotify",
        })
        .addUserOption((option) => option.setName("user").setDescription("User")),
};
