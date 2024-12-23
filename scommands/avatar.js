import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setContexts([0])
        .setDescription("Zeigt dir den supercoolen Avatar eines Users")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Shows the avatar of a user",
            "en-GB": "Shows the avatar of a user",
        })
        .addUserOption((option) =>
            option.setName("user").setDescription("Der Nutzer dessen Avatar du sehen willst").setDescriptionLocalizations({
                "en-US": "The user whose avatar you want to see",
                "en-GB": "The user whose avatar you want to see",
            })
        ),
};
