import { ChannelType } from "discord.js";

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.messageCreate.prefixping;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} message
 */
export default (client, message) => {
    if (message.author.bot || message.guild === null || message.channel.type == ChannelType.DM) return;
    const locale = message.guild.preferredLocale == "de" ? "de" : "en";

    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
        message.reply(l10n.reply[locale].replace("{user}", message.author.username));
    }
};
