const Discord = require("discord.js");
const config = require("../../config.json");
const { ActivityType } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.user.id != config.owner) {
        interaction.reply({
            content: "Du hast keine Berechtigung, diesen Befehl auszuführen.",
            ephemeral: true,
        });
        return;
    }

    const presence = interaction.options.getString("presence");
    const text = interaction.options.getString("text");
    var activity = interaction.options.getString("activity");

    if ((!text || activity) && presence == "streaming")
        return interaction.reply(
            "Um `streaming` verwenden zu können, muss ein Text angegeben werden, und es darf keine Aktivität ausgewählt werden."
        );
    if ((text || activity) && presence == "invisible")
        return interaction.reply(
            "Um `invisible` verwenden zu können, darf kein Text angegeben werden, und es darf keine Aktivität ausgewählt werden."
        );
    await interaction.reply("Status wird geändert...");

    try {
        if (presence == "invisible") {
            client.user.setPresence({ status: "invisible" });
        } else if (presence == "streaming") {
            client.user.setPresence({
                activities: [
                    {
                        name: text.substring(0, 200),
                        type: 1,
                        url: "https://twitch.tv/thevalleyy",
                    },
                ],
                status: "online",
            });
        } else {
            if (!text) {
                client.user.setPresence({ activities: [], status: presence });
            } else {
                if (!activity) {
                    var activity = "Playing";
                }
                if (activity == "Competing") {
                    client.user.setPresence({
                        activities: [
                            {
                                name: text.substring(0, 200),
                                type: ActivityType.Competing,
                            },
                        ],
                        status: presence,
                    });
                }

                if (activity == "Listening") {
                    client.user.setPresence({
                        activities: [
                            {
                                name: text.substring(0, 200),
                                type: ActivityType.Listening,
                            },
                        ],
                        status: presence,
                    });
                }

                if (activity == "Playing") {
                    client.user.setPresence({
                        activities: [
                            {
                                name: text.substring(0, 200),
                                type: ActivityType.Playing,
                            },
                        ],
                        status: presence,
                    });
                }

                if (activity == "Watching") {
                    client.user.setPresence({
                        activities: [
                            {
                                name: text.substring(0, 200),
                                type: ActivityType.Watching,
                            },
                        ],
                        status: presence,
                    });
                }
            }
        }
    } catch (error) {
        client.error(error, "status.js");
        interaction.editReply("Es ist ein Fehler aufgetreten");
        return;
    }
    client.log(
        `${interaction.user.tag} hat den Status zu ${presence} geändert.`,
        "status.js"
    );
    interaction.editReply("Status wurde geändert.");
};
