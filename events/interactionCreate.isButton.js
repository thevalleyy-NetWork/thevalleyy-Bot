import fs from "fs";

export default async (client, interaction) => {
    if (!interaction.isButton()) return;

    const json = await import("./../data/stats.json", { with: { type: "json" } });
    json.default.discord.buttonKlicks += 1;

    fs.writeFile("./data/stats.json", JSON.stringify(json, null, 4), (err) => {
        if (err) client.error(err, "isButton.js");
    });
};
