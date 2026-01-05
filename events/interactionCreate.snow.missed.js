import Enmap from "enmap";
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";

import localization from "../localization.json" with { type: "json" };

const l10n = localization.events.interactionCreate.snow.missed;
const snow = new Enmap({ name: "snow", autoFetch: true, fetchAll: false });

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").ButtonInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "SNOW_missed") return;

    const locale = interaction.locale == "de" ? "de" : "en";
    const id = interaction.user.id;

    try {
        const days = [];
        const n = 4; // n is the max amount of past days that users can add (starting with today). n=2 means that users can add today and yesterday.
        let noDays = true;

        for (let i = 0; i < n; i++) {
            const arr = [];

            const dateToCheck = new Date(Date.now() - i * 86400000).toISOString().substring(0, 10);
            arr[0] = dateToCheck;
            arr[1] = snow.get(id).includes(dateToCheck);

            if (arr[1]) noDays = false;
            days.push(arr);
        }

        // build the select menu with the data
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("SNOW_update")
            .setPlaceholder(noDays ? l10n.noneSelected[locale] : l10n.removeUnselected[locale])
            .setMinValues(0)
            .setMaxValues(days.length)
            .addOptions(
                days.map((day) => {
                    return new StringSelectMenuOptionBuilder()
                        .setLabel(new Date(day[0]).toLocaleDateString(locale === "de" ? "de-DE" : "en-US"))
                        .setValue(day[0])
                        .setEmoji("🌨️")
                        .setDefault(day[1]);
                })
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        interaction.reply({
            content: l10n.explanation[locale].replace("{n}", n),
            components: [row],
            ephemeral: true,
        });
    } catch (err) {
        interaction.reply({ content: l10n.error[locale], ephemeral: true });
        client.error(err, "snow.missed.js");
    }
};
