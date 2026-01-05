import Enmap from "enmap";
import { EmbedBuilder } from "discord.js";

import localization from "../localization.json" with { type: "json" };
import config from "../config.json" with { type: "json" };

const l10n = localization.events.interactionCreate.snow.list;
const snow = new Enmap({ name: "snow", autoFetch: true, fetchAll: false });

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").ButtonInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "SNOW_list") return;

    const locale = interaction.locale == "de" ? "de" : "en";
    const id = interaction.user.id;

    try {
        const currentValues = snow.get(id) || [];
        if (currentValues.length === 0) {
            interaction.reply({
                content: l10n.noEntries[locale],
                ephemeral: true,
            });
            return;
        }

        const formattedDates = currentValues
            .map((iso) => {
                return new Date(iso).toLocaleDateString(locale === "de" ? "de-DE" : "en-US");
            })
            .join("\n * ");

        const embed = new EmbedBuilder()
            .setTitle(l10n.embedTitle[locale])
            .setDescription(`\`\`\` * ${formattedDates}\`\`\``)
            .setFooter({
                text: l10n.embedFooter[locale].replace("{amount}", currentValues.length),
            })
            .setColor(config.colors.default);

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    } catch (err) {
        interaction.reply({ content: l10n.error[locale], ephemeral: true });
        client.error(err, "snow.list.js");
    }
};
