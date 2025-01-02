import { ChannelType, EmbedBuilder } from "discord.js";
import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.messageCreate.dm;
const locale = config.locale;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} message
 */
export default async (client, message) => {
    if (message.channel.type !== ChannelType.DM) return;
    if (message.author.id == config.owner) return;
    if (message.author.bot) return;

    try {
        message.client.users.fetch(config.owner, false).then((user) => {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.avatarURL(),
                    url: `https://discord.com/users/${message.author.id}`,
                })
                .setThumbnail(message.author.avatarURL())
                .setDescription(message.content.substring(0, 4096))
                .setTimestamp()
                .setColor(config.colors.purple)

            user.send({ embeds: [embed] });
            message.react(l10n.reaction[locale]);
        });
    } catch (error) {
        client.error(error, "dm.js");
    }
};
