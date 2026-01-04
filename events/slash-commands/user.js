import { EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.user;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const user = interaction.options.get("user")?.user ?? interaction.user;
    const member = interaction.options.get("user")?.member ?? interaction.member;

    if (!interaction.guild.members.cache.get(user.id)) {
        return interaction.reply({
            content: l10n.notOnThisServer[locale],
            ephemeral: true,
        });
    }

    await client.users.fetch(user.id, { force: true });
    await interaction.guild.members.fetch(user.id, { force: true });

    const embed = new EmbedBuilder()
        .setThumbnail(user.avatarURL({ size: 4096 }))
        .setColor(config.colors.default)
        .setAuthor({
            name: user.username,
            url: `https://discord.com/users/${user.id}`,
            iconURL: user.avatarURL(),
        })
        .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        })
        .setTimestamp()
        .addFields([
            { name: l10n.mention[locale], value: user.toString(), inline: true },
            { name: l10n.tag[locale], value: "`" + user.tag + "`", inline: true },
            { name: l10n.id[locale], value: "`" + user.id + "`", inline: true },
            {
                name: l10n.nickname[locale],
                value: "`" + member.displayName + "`",
                inline: true,
            },
            {
                name: l10n.created[locale],
                value: `<t:${Math.round(user.createdTimestamp / 1000)}:R>`,
                inline: true,
            },
            {
                name: l10n.joined[locale],
                value: `<t:${Math.round(member.joinedTimestamp / 1000)}:R>`,
                inline: true,
            },
            { name: l10n.bot[locale], value: user.bot ? "✅" : "❌", inline: true },
            {
                name: l10n.banable[locale],
                value: member.bannable ? "✅" : "❌",
                inline: true,
            },
            {
                name: l10n.kickable[locale],
                value: member.kickable ? "✅" : "❌",
                inline: true,
            },
            {
                name: l10n.manageable[locale],
                value: member.manageable ? "✅" : "❌",
                inline: true,
            },
            {
                name: l10n.moderatable[locale],
                value: member.moderatable ? "✅" : "❌",
                inline: true,
            },
            {
                name: l10n.rulesAccepted[locale],
                value: member.pending ? "❌" : "✅",
                inline: true,
            },
            {
                name: l10n.avatar[locale],
                value: `[[${l10n.click[locale]}]](${user.avatarURL({ size: 4096 })})`,
                inline: true,
            },
            {
                name: l10n.badges[locale],
                value:
                    user.flags.bitfield == 0
                        ? l10n.none[locale]
                        : user.flags
                              .toArray()
                              .join(", ")
                              .replace("HypeSquadOnlineHouse2", "<:Hypesquad_brilliance_badge:1016793802389852202>")
                              .replace("HypeSquadOnlineHouse1", "<:Hypesquad_bravery_badge:1016793804709314611>")
                              .replace("HypeSquadOnlineHouse0", "<:Hypesquad_balance_badge:1016793803664924733>")
                              .replace("ActiveDeveloper", "<:ActiveDeveloperBadge:1090031169598406700>"), //TODO: Richtige Auflösung ._.
                inline: true,
            },
        ]);

    if (user.hexAccentColor)
        embed.addFields([
            {
                name: l10n.hexColor[locale],
                value: "`" + user.hexAccentColor.toString() + "`",
                inline: true,
            },
        ]);
    if (user.bannerURL()) {
        embed.addFields([
            {
                name: l10n.banner[locale],
                value: `[[${l10n.click[locale]}]](${user.bannerURL({ size: 4096 })})`,
                inline: true,
            },
        ]);
        embed.setImage(user.bannerURL({ size: 4096 }));
    }
    if (member.premiumSinceTimestamp != null && member.premiumSinceTimestamp < Date.now())
        embed.addFields([
            {
                name: l10n.boostingSince[locale],
                value: `<t:${Math.round(member.premiumSinceTimestamp / 1000)}:R>`,
                inline: true,
            },
        ]);
    if (member.communicationDisabledUntilTimestamp != null && member.communicationDisabledUntilTimestamp > Date.now())
        embed.addFields([
            {
                name: l10n.timeout[locale],
                value: `<t:${Math.round(member.communicationDisabledUntilTimestamp / 1000)}:R>`,
                inline: true,
            },
        ]);

    embed.addFields([
        {
            name: l10n.roles[locale],
            value: member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map((role) => role.toString())
                .join(", "),
            inline: false,
        },
        {
            name: l10n.permissions[locale],
            value: "```" + member.permissions.toArray().sort().join(", ") + "```",
            inline: false,
        },
    ]);

    interaction.reply({ embeds: [embed] });
};
