const Discord = require("discord.js");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const embed = new Discord.EmbedBuilder()
        .setTitle("Abgerufen von: " + interaction.user.username)
        .setDescription("Texturen für Minecraft. Von thevalleyy")
        .addFields([
            {
                name: "ACHTUNG",
                value: "**Dieses Pack ist nichtmehr aktuell. Ich arbeite daran, es zu aktualisieren.**",
            },
            {
                name: "Version:",
                value: "Minecraft Java 1.17 | Version der TexturePacks: Beta_0.3",
            },
            {
                name: "Download",
                value: "https://drive.google.com/file/d/1qmDFRpdOqF4HecllwdYI2kWZ--1FU46w/view?usp=sharing",
            },
        ])
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        })
        .setTimestamp()
        .setAuthor({ name: "Infos zum TexturePack von thevalleyy" })
        .setColor("#11dd9d");
    interaction.reply({ embeds: [embed] });
};
