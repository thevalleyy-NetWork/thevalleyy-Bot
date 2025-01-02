import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.guildMemberAdd.memberCount;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").GuildMember} member
 */
export default async (client, member) => {
    if (member.guild.id != config.guild) return;
    const locale = member.guild.preferredLocale == "de" ? "de" : "en";

    const updateMembers = (guild = member.guild) => {
        const memberCount = guild.members.cache.filter((member) => !member.user.bot).size;
        const channel = guild.channels.cache.get(config.channels.memberchannel);

        if (!channel) return client.error(l10n.error[locale], "memberCount.js");

        if (memberCount == 1) return channel.setName(`${l10n.members.singular[locale]}: ${memberCount.toLocaleString()}`, l10n.reason[locale]);
        channel.setName(`${l10n.members.plural[locale]}: ${memberCount.toLocaleString()}`, l10n.reason[locale]);
    };

    try {
        updateMembers(member.guild);
    } catch (error) {
        client.error(error, "memberCount.js");
    }
};
