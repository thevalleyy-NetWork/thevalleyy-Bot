import fs from "node:fs";

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.interactionCreate.isButton;
/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isButton()) return;

    const jsonModule = await import("./../data/stats.json", { with: { type: "json" } });
    jsonModule.default.discord.buttonKlicks += 1;

    fs.writeFile("./data/stats.json", JSON.stringify(jsonModule.default, null, 4), (err) => {
        if (err) client.error(err, "isButton.js");
    });
};
