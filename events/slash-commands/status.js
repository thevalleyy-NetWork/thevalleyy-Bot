import { ActivityType } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.status;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const presence = interaction.options.getString("presence");
    const text = interaction.options.getString("text");
    var activity = interaction.options.getString("activity");

    if ((!text || activity) && presence == "streaming")
        return interaction.reply({
            content: l10n.streamingRestriction[locale],
            ephemeral: true,
        });

    if ((text || activity) && presence == "invisible")
        return interaction.reply({
            content: l10n.invisibilityRestriction[locale],
            ephemeral: true,
        });

    try {
        if (presence == "invisible") {
            client.user.setPresence({ status: "invisible" });
        } else if (presence == "streaming") {
            client.user.setPresence({
                activities: [
                    {
                        name: text.substring(0, 200),
                        type: ActivityType.Streaming,
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
        interaction.reply({
            content: l10n.error[locale],
            ephemeral: true,
        });
        return;
    }
    client.log(`${interaction.user.tag} changed presence to ${presence}`, "status.js");
    interaction.reply({
        content: l10n.changed[locale],
        ephemeral: true,
    });
};
