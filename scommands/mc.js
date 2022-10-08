const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("mc")
        .setDMPermission(false)
        .setDescription(
            "Pingt einen Minecraft-Server, bei keinen Argumenten wird der Server des Netzwerks gepingt."
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname) // 0 = admin only
        .setDescriptionLocalizations({
            "en-US": "Pings a Minecraft server (thevalleyy.tk by default)",
            "en-GB": "Pings a Minecraft server (thevalleyy.tk by default)",
        })
        .addStringOption((option) =>
            option
                .setName("ip")
                .setDescription("Die IP-Adresse des Servers")
                .setDescriptionLocalizations({
                    "en-US": "The IP address of the server",
                    "en-GB": "The IP address of the server",
                })
        )

        .addStringOption((option) =>
            option
                .setName("port")
                .setDescription("Der Port des Servers")
                .setDescriptionLocalizations({
                    "en-US": "The port of the server",
                    "en-GB": "The port of the server",
                })
        ),
};
