import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("neko")
        .setContexts([0])
        .setDescription("Katzenbilder")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Cat pictures",
            "en-GB": "Cat pictures",
        })
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription("Typ")
                .setDescriptionLocalizations({
                    "en-US": "Type",
                    "en-GB": "Type",
                })
                .addChoices(
                    { name: "Hug", value: "hug" },
                    { name: "Cry", value: "cry" },
                    { name: "Smug", value: "smug" },
                    { name: "Slap", value: "slap" },
                    { name: "Pat", value: "pat" },
                    { name: "Laugh", value: "laugh" },
                    { name: "Feed", value: "feed" },
                    { name: "Cuddle", value: "cuddle" }
                )
        ),
};
