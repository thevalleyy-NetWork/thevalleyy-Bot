import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.guildMemberAdd.welcome;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").GuildMember} members
 */
export default async (client, member) => {
    if (member.guild.id != config.guild) return;
    const locale = member.guild.preferredLocale == "de" ? "de" : "en";

    const chatMuteRole = config.roles.mutechat;
    const voiceMuteRole = config.roles.mutetalk;

    try {
        // TODO: change to json db
        // was the user here before?
        // update the newest join date
        // has the user been muted permanentely before?
        // has he the nice one role?
        // also log joins and leaves

        const message = l10n.message[locale]
            .replace("{member}", `<@${member.id}>`)
            .replace("{guild}", member.guild.name)
            .replace("{rules}", `<#${config.channels.ruleschannel}>`);
        const channel = member.guild.channels.cache.get(config.channels.welcomechannel);
        channel.send(message).then((message) => {
            setTimeout(() => message.react(l10n.reaction[locale]), 50);
        });
    } catch (err) {
        client.error(err, "welcome.js");
    }
};
