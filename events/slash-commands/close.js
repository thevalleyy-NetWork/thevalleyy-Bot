import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.close;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const iconurl = interaction.guild.iconURL();
    const suprole = interaction.guild.roles.cache.get(config.roles.supporter);
    const modrole = interaction.guild.roles.cache.get(config.roles.moderator);

    const creatorID = interaction.channel.topic.split("<@")[1].split(">")[0];

    if (!interaction.channel.name.startsWith("🎫-"))
        return interaction.reply({
            content: l10n.noTicket[locale],
            ephemeral: true,
        });

    if (creatorID !== interaction.user.id && !interaction.member.roles.cache.has(suprole.id) && !interaction.member.roles.cache.has(modrole.id))
        return interaction.reply({
            content: l10n.selfClose[locale],
            ephemeral: true,
        });

    const category = interaction.guild.channels.cache.get(config.channels.ticketcategory);
    try {
        interaction.channel.permissionOverwrites.edit(creatorID, {
            ViewChannel: false,
            SendMessages: false,
        });

        interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
            ViewChannel: false,
            SendMessages: false,
        });

        interaction.channel.setName(interaction.channel.name.replace("🎫", "🔒"));
        interaction.channel.setPosition(category.children.cache.size - 1);

        const embed = new EmbedBuilder()
            .setTitle(l10n.title[locale])
            .setColor(config.colors.purple)
            .setFooter({ text: interaction.guild.name, iconURL: iconurl })
            .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/15/34/ticket-150090_960_720.png")
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.avatarURL(),
            })
            .addFields([
                {
                    name: l10n.ticketArchive[locale],
                    value: `<@&${suprole.id}> ${l10n.or[locale]} <@&${modrole.id}>`,
                    inline: true,
                },
                {
                    name: `${l10n.yes[locale]}  |  ${l10n.no[locale]}`,
                    value: "ㅤ",
                    inline: true,
                },
            ]);

        const buttonArchive = new ButtonBuilder().setCustomId("TICKET_archive").setEmoji("<:checkmarkButton:1005146895045373992> ").setStyle("Secondary");

        const buttonDelete = new ButtonBuilder().setCustomId("TICKET_delete").setEmoji("<:crossButton:1005146897373216908>").setStyle("Secondary");

        const ticketButtons = new ActionRowBuilder().addComponents(buttonArchive, buttonDelete);

        interaction.reply({ embeds: [embed], components: [ticketButtons] });
        client.modLog(l10n.modLog[locale].replace("{user}", interaction.user.tag).replace("{channel}", interaction.channel.name), "close.js");
    } catch (err) {
        client.error(err, "close.js");
        interaction.reply({
            content: l10n.error[locale],
            ephemeral: true,
        });
    }
};
