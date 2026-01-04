import { EmbedBuilder } from "discord.js";
import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.interactionCreate.ticket.open;

function time() {
    var date = new Date();

    let secFiller = "";
    let minFiller = "";
    let hourFiller = "";
    let dayFiller = "";
    let monthFiller = "";

    if (date.getSeconds().toString().length < 2) secFiller = "0";
    if (date.getMinutes().toString().length < 2) minFiller = "0";
    if (date.getHours().toString().length < 2) hourFiller = "0";
    if (date.getDate().toString().length < 2) dayFiller = "0";
    if (date.getMonth().toString().length < 2) monthFiller = "0";

    var datetime =
        dayFiller +
        date.getDate() +
        ". " +
        monthFiller +
        (date.getMonth() + 1) +
        ". " +
        date.getFullYear() +
        " | " +
        hourFiller +
        date.getHours() +
        ":" +
        minFiller +
        date.getMinutes() +
        ":" +
        secFiller +
        date.getSeconds();

    return datetime;
}

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 */
export default (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "TICKET_create") return;

    const locale = interaction.locale == "de" ? "de" : "en";

    const server = interaction.guild;
    const ticketName = config.ticketprefix + interaction.user.tag.toLowerCase();

    try {
        const firstTicket = server.channels.cache.get(config.channels.ticketcategory).children.cache.find((c) => c.topic.includes(interaction.user.id));
        if (firstTicket)
            return interaction.reply({
                content: l10n.alreadyOpen[locale].replace("{channel}", "<#" + firstTicket.id + ">"),
                ephemeral: true,
            });

        const suprole = interaction.guild.roles.cache.get(config.roles.supporter);
        const modrole = interaction.guild.roles.cache.get(config.roles.moderator);

        const category = server.channels.cache.get(config.channels.ticketcategory);
        server.channels
            .create({
                name: ticketName,
                topic: l10n.topic[locale].replace("{user}", "<@" + interaction.user.id + ">").replace("{time}", time()),
                position: 0,
                parent: category,
            })
            .then((channel) => {
                channel.permissionOverwrites.edit(interaction.user.id, {
                    UseExternalEmojis: true,
                    ViewChannel: true,
                    SendMessages: true,
                    ReadMessageHistory: true,
                    AttachFiles: true,
                    EmbedLinks: true,
                    AddReactions: true,
                });

                channel.permissionOverwrites.edit(server.id, {
                    ViewChannel: false,
                    SendMessages: false,
                });

                channel.permissionOverwrites.edit(modrole.id, {
                    ViewChannel: true,
                    SendMessages: true,
                    ReadMessageHistory: true,
                    AttachFiles: true,
                    EmbedLinks: true,
                    SendTTSMessages: true,
                    ManageMessages: true,
                    UseExternalEmojis: true,
                    ManageChannels: true,
                    AddReactions: true,
                });

                channel.permissionOverwrites.edit(suprole.id, {
                    ViewChannel: true,
                    SendMessages: true,
                    ReadMessageHistory: true,
                    AttachFiles: true,
                    EmbedLinks: true,
                    UseExternalEmojis: true,
                    AddReactions: true,
                });

                interaction.reply({
                    content: l10n.createString[locale].replace("{channel}", "<#" + channel.id + ">"),
                    ephemeral: true,
                });

                const embed = new EmbedBuilder()
                    .setTitle(l10n.title[locale].replace("{user}", interaction.user.tag))
                    .setDescription(l10n.description[locale].replace("{suprole}", "<@&" + suprole + ">").replace("{modrole}", "<@&" + modrole + ">"))
                    .setColor(config.colors.purple)
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: server.iconURL(),
                    })
                    .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/15/34/ticket-150090_960_720.png")
                    .setAuthor({
                        name: l10n.ticket[locale],
                        iconURL: interaction.user.avatarURL(),
                    })
                    .addFields([
                        {
                            name: l10n.rules[locale],
                            value: l10n.close[locale],
                        },
                    ]);

                channel.send({ embeds: [embed] }).then((message) => {
                    message.pin();
                });

                const embedLog = new EmbedBuilder()
                    .setTitle(l10n.created[locale])
                    .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27")
                    .addFields([
                        {
                            name: interaction.user.tag,
                            value: "in <#" + channel.id + ">",
                        },
                    ])
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: server.iconURL(),
                    })
                    .setTimestamp()
                    .setColor(config.colors.info);
                client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embedLog] });
                client.channels.cache
                    .get(config.channels.modlogchannel)
                    .send({ content: "<@&" + modrole + "> & <@&" + suprole + ">" })
                    .then((message) => {
                        message.delete();
                    });

                client.log(interaction.user.tag + " opened a ticket", "ticket.open.js");
            });
    } catch (err) {
        client.error(err, "ticket.open.js");
    }
};
