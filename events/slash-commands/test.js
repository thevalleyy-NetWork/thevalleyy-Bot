import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

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

    const embed = new EmbedBuilder()
        .setTitle("Ticket erstellen")
        .setColor("#7289da")
        .setDescription("Drücke auf \🎫, um ein neues Ticket zu erstelllen.")
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

    const button = new ButtonBuilder().setCustomId("TICKET_create").setEmoji("\🎫").setStyle("Primary");

    const row = new ActionRowBuilder().addComponents(button);

    const channel = await interaction.guild.channels.fetch("843054827910201384");
    const message = await channel.messages.fetch("843060299288412190");
    await message.edit({ embeds: [embed], components: [row] });
};
