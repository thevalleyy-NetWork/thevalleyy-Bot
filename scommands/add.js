import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("add")
        .setContexts([0]) // TODO: does this work?
        .setDescription("Addiert zwei Zahlen")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
        .setDescriptionLocalizations({
            "en-US": "Get the sum of two numbers", // TODO: can this be done with one string?
            "en-GB": "Get the sum of two numbers",
        })
        .addNumberOption((option) =>
            option.setName("number1").setDescription("Erste Zahl").setRequired(true).setDescriptionLocalizations({
                "en-US": "First number",
                "en-GB": "First number",
            })
        )

        .addNumberOption((option) =>
            option.setName("number2").setDescription("Zweite Zahl").setRequired(true).setDescriptionLocalizations({
                "en-US": "Second number",
                "en-GB": "Second number",
            })
        ),
};
