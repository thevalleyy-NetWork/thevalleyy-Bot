import { ActivityType } from "discord.js";
import fs from "node:fs";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.maintenance;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const maintenance = JSON.parse(fs.readFileSync("./data/maintenance.json", "utf8"));

    const boolean = interaction.options.getBoolean("maintenance");
    const reason = interaction.options.getString("reason");

    if (boolean  && maintenance.maintenance )
        return interaction.reply({
            content: l10n.alreadyInMaintenance[locale],
            ephemeral: true,
        });
    if (!boolean && !maintenance.maintenance )
        return interaction.reply({
            content: l10n.notInMaintenance[locale],
            ephemeral: true,
        });

    fs.writeFileSync(
        "./data/maintenance.json",
        JSON.stringify(
            {
                maintenance: boolean,
                reason: reason ? reason : config.maintenance.reason,
            },
            null,
            4
        )
    );
    if (boolean) {
        client.user.setPresence({
            activities: [
                {
                    name: config.maintenance.activityOn,
                    type: ActivityType.Playing,
                },
            ],
            status: "dnd",
        });
    } else {
        client.user.setPresence({
            activities: [
                {
                    name: config.maintenance.activityOff,
                    type: ActivityType.Playing,
                },
            ],
            status: "online",
        });
    }

    interaction.reply({
        content: `${l10n.botIs[locale]} ${boolean ? l10n.maintenance[locale] : l10n.normal[locale]}.`,
        ephemeral: true,
    });
};
