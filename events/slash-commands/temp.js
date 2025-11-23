const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = Discord;

const embed = new EmbedBuilder()
    .setTitle("☃️ Schnee-Counter 🌲")
    .setColor("#e4fdfa")
    .setDescription(
        "Es hat geschneit? \nDrücke auf ❄️, um den Schneetag zu speichern."
    )
    .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
    });

const button = new ButtonBuilder()
    .setCustomId("SNOW_add")
    .setEmoji("❄️")
    .setStyle("Primary");

const row = new ActionRowBuilder().addComponents(button);

interaction.channel.send({ embeds: [embed], components: [row] });
