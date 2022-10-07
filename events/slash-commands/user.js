const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.guild.members.cache.get(interaction.options.get('user').user.id)) return interaction.reply({ content: "Dieser Benutzer ist nicht auf diesem Server!", ephemeral: true })

    if (interaction.options.get("user")) {
        var user = interaction.options.get("user").user;
    } else var user = interaction.user;

    if (interaction.options.get("user")) {
        var member = interaction.options.get("user").member;
    } else var member = interaction.member;

    await client.users.fetch(user.id, { force: true });

    const embed = new Discord.EmbedBuilder()
        .setThumbnail(user.avatarURL( { size: 4096} ))
        .setColor(config.standard_color)
        .setAuthor({ name: user.username, url: `https://discord.com/users/${user.id}`, iconURL: user.avatarURL() })
        .setFooter( { text: interaction.guild.name, iconURL: interaction.guild.iconURL() } )
        .setTimestamp()
        .addFields([
            { name: "Erwähnung", value: user.toString(), inline: true },
            { name: "Tag", value: "`" + user.tag + "`", inline: true },
            { name: "ID", value: "`" + user.id + "`", inline: true },
            { name: "Nickname", value: "`" + member.displayName + "`", inline: true },
            { name: "Erstellt", value: `<t:${Math.round(user.createdTimestamp / 1000)}:R>`, inline: true },
            { name: "Beigetreten", value: `<t:${Math.round(member.joinedTimestamp / 1000)}:R>`, inline: true },
            { name: "Bot", value: user.bot ? "✅" : "❌", inline: true },
            { name: "Bannbar?", value: member.bannable ? "✅" : "❌", inline: true },
            { name: "Kickbar?", value: member.kickable ? "✅" : "❌", inline: true },
            { name: "Managebar?", value: member.manageable ? "✅" : "❌", inline: true },
            { name: "Moderierbar?", value: member.moderatable ? "✅" : "❌", inline: true },
            { name: "Regeln akzeptiert?", value: member.pending ? "❌" : "✅", inline: true },
            { name: "Avatar", value: `[[Klick]](${user.avatarURL({ size: 4096 })})`, inline: true },
            { name: "Badges", value: user.flags.bitfield == 0 ? "Keine Badges" : user.flags.toArray().join(", ").replace("HypeSquadOnlineHouse2", "<:Hypesquad_brilliance_badge:1016793802389852202>").replace("HypeSquadOnlineHouse1", "<:Hypesquad_bravery_badge:1016793804709314611>").replace("HypeSquadOnlineHouse0", "<:Hypesquad_balance_badge:1016793803664924733>"), inline: true }
        ])

        if (user.hexAccentColor) embed.addFields([{ name: "hexAccentColor", value: user.hexAccentColor.toString(), inline: true }])
        if (user.bannerURL()) {
            embed.addFields([{ name: "Banner", value: `[[Click]](${user.bannerURL( {size: 4096})})`, inline: true }])
            embed.setImage(user.bannerURL( {size: 4096}))
        }
        if (member.premiumSinceTimestamp != null && member.premiumSinceTimestamp > Date.now()) embed.addFields([{ name: "Boostet seit", value: `<t:${Math.round(member.premiumSinceTimestamp / 1000)}:R>`, inline: true }])
        if (member.communicationDisabledUntilTimestamp != null && member.communicationDisabledUntilTimestamp > Date.now()) embed.addFields([{ name: "Timeout läuft ab", value: `<t:${Math.round(member.communicationDisabledUntilTimestamp / 1000)}:R>`, inline: true }])

        embed.addFields([
            { name: "Rollen", value: member.roles.cache.map(role => role.toString()).join(", "), inline: false },
            { name: "Berechtigungen", value: "```" + member.permissions.toArray().join(", ") + "```", inline: false }
        ])


    interaction.reply({ embeds: [embed] })
}