import Enmap from "enmap";
import localization from "../localization.json" with { type: "json" };

const l10n = localization.events.interactionCreate.snow.add;
const snow = new Enmap({ name: "snow", autoFetch: true, fetchAll: false });

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "SNOW_add") return;

    const locale = interaction.locale == "de" ? "de" : "en";
    const id = interaction.user.id;

    try {
        const date = new Date().toISOString().substring(0, 10);

        // already added?
        if (snow.get(id)?.includes(date)) {
            interaction.reply({
                content: l10n.alreadyAdded[locale],
                ephemeral: true,
            });
            return;
        }

        // add snowday to database
        const currentValues = snow.get(id) || [];
        currentValues.push(date);
        snow.set(id, currentValues);

        interaction.reply({
            content: l10n.success[locale].replace(
                "{amount}",
                currentValues.length
            ),
            ephemeral: true,
        });
    } catch (err) {
        interaction.reply({ content: l10n.error[locale], ephemeral: true });
        client.error(err, "snow.add.js");
    }
};
