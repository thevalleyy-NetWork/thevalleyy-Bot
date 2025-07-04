import { EmbedBuilder } from "discord.js";
import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.guildMemberUpdate.nickname;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").GuildMember} oldMember
 * @param {import("discord.js").GuildMember} newMember
 */
export default async (client, oldMember, newMember) => {
    if (newMember.guild.id != config.guild) return;
    if (oldMember.nickname === newMember.nickname) return;

    const locale = newMember.guild.preferredLocale == "de" ? "de" : "en";

    const fetchedLogs = await newMember.guild.fetchAuditLogs({
        limit: 1,
        type: 24, // MemberUpdate = 24
    });

    const latest = fetchedLogs.entries.first();
    const executor = latest.executor;
    if (!latest) return;

    const oldname = oldMember.displayName
    const newname = newMember.displayName

    const embed = new EmbedBuilder()
        .setTitle(l10n.changed[locale])
        .addFields([
            {
                name: l10n.user[locale],
                value: `\`${newMember.user.tag}\`, <@!${newMember.user.id}>`,
                inline: false
            },
            { name: `${l10n.before[locale]}:`, value: `\`${oldname}\``, inline: true },
            { name: `${l10n.now[locale]}:`, value: `\`${newname}\``, inline: true },
            { name: `${l10n.executor[locale]}:`, value: `<@!${executor.id}>`, inline: true },
        ])

        .setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL() })
        .setTimestamp()
        .setColor(config.colors.info);
    client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] });
};
