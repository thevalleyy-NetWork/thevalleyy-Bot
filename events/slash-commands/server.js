import { EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.server;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const guild = interaction.guild;
    await guild.fetch();
    await guild.bans.fetch().catch(() => {});
    await guild.invites.fetch().catch(() => {});
    await guild.scheduledEvents.fetch().catch(() => {});

    if (!guild.available)
        return interaction.reply({
            content: l10n.notAvailable[locale],
            ephemeral: true,
        });

    const embed = new EmbedBuilder()
        .setThumbnail(guild.iconURL({ size: 4096 }))
        .setColor(config.colors.default)
        .setAuthor({
            name: guild.name,
            url: `https://discord.com/channels/${guild.id}`,
            iconURL: guild.iconURL(),
        })
        .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        })
        .setTimestamp()
        .addFields([
            { name: l10n.name[locale], value: guild.name, inline: true },
            { name: l10n.id[locale], value: "`" + guild.id + "`", inline: true },
            {
                name: l10n.created[locale],
                value: `<t:${Math.round(guild.createdTimestamp / 1000)}:R>`,
                inline: true,
            },
            { name: l10n.owner[locale], value: `<@${guild.ownerId}>`, inline: true },
            {
                name: l10n.description[locale],
                value: guild.description ? "`" + guild.description + "`" : l10n.none[locale],
                inline: true,
            },
            {
                name: l10n.members[locale],
                value: "`" + guild.memberCount + "`",
                inline: true,
            },
            {
                name: l10n.maxMembers[locale],
                value: "`" + guild.maximumMembers + "`",
                inline: true,
            },
            {
                name: l10n.invites[locale],
                value: "`" + guild.invites.cache.size + "`",
                inline: true,
            },
            {
                name: l10n.events[locale],
                value: "`" + guild.scheduledEvents.cache.size + "`",
                inline: true,
            },
            {
                name: l10n.locale[locale],
                value: `:flag_${guild.preferredLocale.replace("en-", "").toLowerCase()}:`,
                inline: true,
            },
            {
                name: l10n.channels[locale],
                value: "`" + guild.channels.cache.size + "`",
                inline: true,
            },
            {
                name: l10n.emojis[locale],
                value: "`" + guild.emojis.cache.size + "`",
                inline: true,
            },
            {
                name: l10n.stickers[locale],
                value: "`" + guild.stickers.cache.size + "`",
                inline: true,
            },
            {
                name:  l10n.bans[locale],
                value: "`" + guild.bans.cache.size + "`",
                inline: true,
            },
            {
                name: l10n.boosts[locale],
                value: "`" + guild.premiumSubscriptionCount + "`",
                inline: true,
            },
            {
                name: l10n.shardPing[locale],
                value: "`" + guild.shard.ping + "ms`",
                inline: true,
            },
            {
                name: l10n.partnered[locale],
                value: guild.partnered ? "✅" : "❌",
                inline: true,
            },
            {
                name: l10n.verified[locale],
                value: guild.verified ? "✅" : "❌",
                inline: true,
            },
        ]);

    if (guild.vanityURLCode) embed.addFields([{ name: l10n.vanityURL[locale], value: guild.vanityURLCode, inline: true }]);

    embed.addFields([
        {
            name: l10n.roles[locale],
            value: guild.roles.cache.map((role) => role.toString()).join(", "),
            value: guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map((role) => role.toString())
                .join(", "),
            inline: false,
        },
        {
            name: l10n.features[locale],
            value: guild.features.length > 0 ? "```" + guild.features.sort().join(", ") + "```" : l10n.none[locale],
            inline: false,
        },
    ]);

    interaction.reply({ embeds: [embed] });
};
