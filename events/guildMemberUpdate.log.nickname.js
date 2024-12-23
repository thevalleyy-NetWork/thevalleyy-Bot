import config from "../config.json" with { type: "json" };
import { EmbedBuilder } from "discord.js";

export default async (client, oldMember, newMember) => {
    if (newMember.guild.id != config.guild) return;
    if (oldMember.nickname === newMember.nickname) return;
    const iconurl = newMember.guild.iconURL();

    const fetchedLogs = await newMember.guild.fetchAuditLogs({
        limit: 1,
        type: 24, // MemberUpdate = 24
    });
    const latest = fetchedLogs.entries.first();
    const executor = latest.executor;
    if (!latest) return;

    if (newMember.nickname === null) {
        var oldname = oldMember.nickname;
        var newname = newMember.user.username;
    } else if (oldMember.nickname === null) {
        var oldname = oldMember.user.username;
        var newname = newMember.nickname;
    } else {
        var oldname = oldMember.nickname;
        var newname = newMember.nickname;
    }

    const embed = new EmbedBuilder()
        .setTitle("LOG: Nickname geändert")
        .addFields([
            {
                name: "User",
                value: `\`${newMember.user.tag}\`, <@!${newMember.user.id}>`,
            },
            { name: "Vorher: ", value: `\`${oldname}\`` },
            { name: "Nachher: ", value: `\`${newname}\`` },
            { name: "Ausgeführt von:", value: `<@!${executor.id}>` },
        ])

        .setFooter({ text: newMember.guild.name, iconURL: iconurl })
        .setTimestamp()
        .setColor(config.colors.info);
    client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] });
};
