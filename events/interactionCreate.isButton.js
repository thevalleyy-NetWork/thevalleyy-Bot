import fs from "fs";

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isButton()) return;

    const jsonModule = await import("./../data/stats.json", { with: { type: "json" } });
    jsonModule.default.discord.buttonKlicks += 1;

    fs.writeFile("./data/stats.json", JSON.stringify(jsonModule.default, null, 4), (err) => {
        if (err) client.error(err, "isButton.js");
    });
};
