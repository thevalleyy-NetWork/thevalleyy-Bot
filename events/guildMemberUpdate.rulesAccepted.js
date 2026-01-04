import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.guildMemberUpdate.rulesAccepted;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").GuildMember} oldMember
 * @param {import("discord.js").GuildMember} newMember
 */
export default async (client, oldMember, newMember) => {
    if (newMember.guild.id != config.guild) return;
    const locale = newMember.guild.preferredLocale == "de" ? "de" : "en";

    try {
        if (oldMember.pending === newMember.pending) return;
        if (newMember.pending === false) {
            const niceone = newMember.guild.roles.cache.get(config.roles.niceone).id;
            const mitglied = newMember.guild.roles.cache.get(config.roles.member).id;

            if (!niceone || !mitglied) return client.error(l10n.roleNotFound[locale], "rulesAccepted.js");

            newMember.roles.add(mitglied);
            newMember.roles.add(niceone);

            //TODO: testfor niceone in db

            client.channels.cache
                .get(config.channels.modlogchannel)
                .send(l10n.message[locale].replace("{member}", "<@" + newMember.user.id + ">").replace("{niceone}", "✅"));
        }
    } catch (error) {
        client.error(error, "rulesAccepted.js");
    }
};
