const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    if (interaction.options.get("user")) {
        var user = interaction.options.get("user").user;
    } else var user = interaction.user;

    if (interaction.options.get("user")) {
        var member = interaction.options.get("user").member;
    } else var member = interaction.member;

    await client.users.cache.fetch(user.id)

    const embed = new Discord.EmbedBuilder()
        .setTitle(`User-Info: ${user.username}`)
        .setThumbnail(user.avatarURL())
        .setColor(config.standard_color)
        .setAuthor({ name: user.username, url: `https://discord.com/users/${user.id}`, iconURL: user.avatarURL() })
        .setTimestamp()
        .addFields([
            { name: "Username", value: user.username, inline: true },
            { name: "Discriminator", value: user.discriminator, inline: true },

            /*
            .hexAccentColor
            .bot
            .createdTimestamp
            .tag
            .flags
            .id
            .avatarURL()
            .bannerURL()
            .displayAvatarURL()
            
            .bannable
            .communicationDisabledUntilTimestamp (mit date vergleichen)
            .displayHexColor
            .displayName
            .joinedTimestamp
            .kickable
            .manageable
            .moderatable
            .pending
            .permissions
            .premiumSinceTimestamp
            .roles
            .voice

            badges



            */

        ])

    console.log(user, member)
    interaction.reply({ embeds: [embed] })
}