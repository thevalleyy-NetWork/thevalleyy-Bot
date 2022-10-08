const Discord = require("discord.js");
const config = require("../../config.json");
const fs = require("node:fs");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.user.id != config.owner) {
        interaction.reply({
            content: "Du hast keine Berechtigung, diesen Befehl auszuführen.",
            ephemeral: true,
        });
        return;
    }

    const maintenance = JSON.parse(
        fs.readFileSync("./data/maintenance.json", "utf8")
    );

    const boolean = interaction.options.getBoolean("maintenance");
    const reason = interaction.options.getString("reason");

    if (boolean == true && maintenance.maintenance == true)
        return interaction.reply({
            content: "Der Bot ist bereits im Wartungsmodus.",
            ephemeral: true,
        });
    if (boolean == false && maintenance.maintenance == false)
        return interaction.reply({
            content: "Der Bot ist nicht im Wartungsmodus.",
            ephemeral: true,
        });

    fs.writeFileSync(
        "./data/maintenance.json",
        JSON.stringify(
            {
                maintenance: boolean,
                reason: reason
                    ? reason
                    : "⚙ Es finden aktuell Wartungsarbeiten statt.",
            },
            null,
            4
        )
    );
    if (boolean == true) {
        client.user.setPresence({
            activities: [
                {
                    name: "🛑 Wartungsmodus",
                    type: Discord.ActivityType.Playing,
                },
            ],
            status: "dnd",
        });
    } else {
        client.user.setPresence({
            activities: [
                {
                    name: "✅ Wartungen beendet",
                    type: Discord.ActivityType.Playing,
                },
            ],
            status: "online",
        });
    }

    interaction.reply({
        content: `Der Bot ist nun im ${
            boolean ? "Wartungsmodus" : "Normalmodus"
        }.`,
        ephemeral: true,
    });
};
