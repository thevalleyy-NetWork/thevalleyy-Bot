import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";
import Discord from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.test;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    // const embed = new EmbedBuilder()
    //     .setTitle("Ticket erstellen")
    //     .setColor("#7289da")
    //     .setDescription("Drücke auf \🎫, um ein neues Ticket zu erstelllen.")
    //     .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

    // const button = new ButtonBuilder().setCustomId("TICKET_create").setEmoji("\🎫").setStyle("Primary");

    // const row = new ActionRowBuilder().addComponents(button);

    // const channel = await interaction.guild.channels.fetch("843054827910201384");
    // const message = await channel.messages.fetch("843060299288412190");
    // await message.edit({ embeds: [embed], components: [row] });

    const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = Discord;

    const embed = new EmbedBuilder()
        .setTitle("☃️ Schnee-Counter 🌲")
        .setColor("#fffafa")
        .setDescription("Es hat geschneit? \nDrücke auf ❄️, um den Schneetag zu speichern. \nMit 🗓️ kannst du Schneetage nachträglich ändern :)")
        .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        });

    const button = new ButtonBuilder().setCustomId("SNOW_add").setEmoji("❄️").setStyle("Primary");
    const button2 = new ButtonBuilder().setCustomId("SNOW_missed").setEmoji("🗓️").setStyle("Secondary");
    const button3 = new ButtonBuilder().setCustomId("SNOW_list").setEmoji("📋").setStyle("Secondary");

    const row = new ActionRowBuilder().addComponents([button, button2, button3]);

    // interaction.guild.channels.fetch("1442179991985979393").then((c) => {
    //     c.messages.fetch("1442180427409260746").then((m) => {
    //         m.edit({ embeds: [embed], components: [row] });
    //     });
    // });

    interaction.channel.send({ embeds: [embed], components: [row] });

    // await interaction.reply({ content: "```json\n" + JSON.stringify(client.db.snow.entries()) + "\n```", ephemeral: true });
};
