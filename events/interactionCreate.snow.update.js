import Enmap from "enmap";
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonInteraction } from "discord.js";

import localization from "../localization.json" with { type: "json" };

const l10n = localization.events.interactionCreate.snow.update;
const snow = new Enmap({ name: "snow", autoFetch: true, fetchAll: false });

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").StringSelectMenuInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "SNOW_update") return;

    const locale = interaction.locale == "de" ? "de" : "en";
    const id = interaction.user.id;

    try {
        // get items and selection status
        const oldestDay = new Date(Date.now() - 3 * 86400000).toISOString().substring(0, 10);
        const days = [];
        let added = 0;
        let removed = 0;

        // console.log(oldestDay);

        for (const option of interaction.component.options) {
            if (new Date(oldestDay).getTime() - new Date(option.value).getTime() > 0) {
                await interaction.reply({
                    content: "Du hast zu lange gewartet",
                    ephemeral: true,
                });
                return; // exits the handler, not just the loop
            }

            days.push([option.value, interaction.values.includes(option.value)]);
        }

        // apply update
        const data = snow.get(id) || [];

        days.forEach((day) => {
            if (day[1]) {
                // this day should be added to the database
                if (!data.includes(day[0])) {
                    added++;
                    data.push(day[0]);
                }
            } else {
                // remove the entry if possible
                const index = data.indexOf(day[0]);

                if (index !== -1) {
                    removed++;
                    data.splice(index, 1);
                }
            }
        });

        // update data
        snow.set(id, data);

        await interaction.reply({
            content: `☃️ Schneetage aktualisiert. \nNeu hinzugefügt: ${added} \nTage entfernt: ${removed}`,
            ephemeral: true,
        });

        // await interaction.deferUpdate();

        // simulate button press on list days
        // (await import("./interactionCreate.snow.list.js")).default(client, interaction, true);
    } catch (err) {
        throw err;
        interaction.reply({ content: l10n.error[locale], ephemeral: true });
        client.error(err, "snow.update.js");
    }
};
