import config from "../config.json" with { type: "json" };
import { EmbedBuilder } from "discord.js";

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.voiceStateUpdate.channel;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").VoiceState} oldState
 * @param {import("discord.js").VoiceState} newState
 */
export default async (client, oldState, newState) => {
    if (oldState.channelId === newState.channelId) return;
    if (newState.member.user.bot) return;
    if (newState.guild.id != config.guild) return;

    const iconurl = client.guilds.cache.get(oldState.guild.id).iconURL();
    const locale = oldState.guild.preferredLocale == "de" ? "de" : "en";

    // TODO: form this down to one statement
    const action = oldState.channelId === null ? "joined" : newState.channelId === null ? "left" : "switched";

    const embed = new EmbedBuilder()
        .setTitle(l10n[action][locale])
        .addFields([
            {
                name: l10n.member[locale],
                value: `\`${newState.member.user.tag}\`, <@${newState.member.user.id}>`,
            },
            {
                name: l10n.before[locale],
                value: oldState.channelId === null ? l10n.noChannel[locale] : `<#${oldState.channelId}>`,
                inline: true,
            },
            {
                name: l10n.now[locale],
                value: newState.channelId === null ? l10n.noChannel[locale] : `<#${newState.channelId}>`,
                inline: true,
            },
            {
                name: l10n.sessionID[locale],
                value: `\`${newState.sessionId}\``,
                inline: true,
            },
        ])

        .setFooter({ text: oldState.guild.name, iconURL: iconurl })
        .setTimestamp()
        .setColor(config.colors.info);

    client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] });

    // TODO: log executor
    // TODO: radio
};
