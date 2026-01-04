import { EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import progressbar from "string-progressbar";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.spotify;

// function to calculate the duration of a song in hh:mm:ss format
function getDuration(start, end) {
    const date = new Date(end - start);

    let secFiller = "";
    let minFiller = "";
    let hourFiller = "";

    if (date.getSeconds().toString().length < 2) secFiller = "0";
    if (date.getMinutes().toString().length < 2) minFiller = "0";
    if (date.getHours().toString().length - 1 < 2) hourFiller = "0";

    return `${hourFiller}${date.getHours() + date.getTimezoneOffset() / 60}:${minFiller}${date.getMinutes()}:${secFiller}${date.getSeconds()}`;
}

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const user = interaction.options.get("user")?.user ?? interaction.user;

    if (!interaction.guild.members.cache.get(user.id)) {
        return interaction.reply({
            content: l10n.notOnServer[locale],
            ephemeral: true,
        });
    }

    const member = interaction.options.get("user")?.member ?? interaction.member;

    await client.users.fetch(user.id, false);

    let result;
    const acts = await member.presence.activities;
    await acts.forEach((Activity) => {
        if (Activity.name.toLowerCase() === "spotify") {
            result = Activity;
        }
    });

    if (!result) {
        return interaction.reply({
            content: l10n.notListening[locale].replace("{user}", user.username),
        });
    }

    // calculate the progressbar
    const songlenght = new Date(await result.timestamps.end.toString()).getTime() - new Date(await result.timestamps.start.toString()).getTime();
    const lenghtInSeconds =
        new Date(songlenght).getSeconds() +
        new Date(songlenght).getMinutes() * 60 +
        (new Date(songlenght).getHours() + new Date(songlenght).getTimezoneOffset() / 60) * 3600;
    const currentSeconds = Date.now().toString().slice(0, -3) - result.createdTimestamp.toString().slice(0, -3);
    const values = progressbar.filledBar(lenghtInSeconds, currentSeconds, 38, "-", "=");

    const embed = new EmbedBuilder()
        .setColor(config.colors.default)
        .setTitle(l10n.listening[locale].replace("{user}", user.username) + ":")
        .addFields([
            {
                name: `${l10n.title[locale]}:`,
                value: `\`${result.details}\``,
                inline: true,
            },
            {
                name: `${l10n.album[locale]}:`,
                value: `\`${result.assets.largeText}\``,
                inline: true,
            },
            {
                name: `${l10n.duration[locale]}:`,
                value: `\`${await getDuration(new Date(result.timestamps.start.toString()).getTime(), new Date(result.timestamps.end.toString()).getTime())}\``,
                inline: true,
            },
        ]);

    if (result.state.includes(";")) {
        // artist or artists
        embed.addFields([
            {
                name: `${l10n.artist.plural[locale]}:`,
                value: `\`${result.state.replaceAll(";", ",")}\``,
                inline: true,
            },
        ]);
    } else {
        embed.addFields([
            {
                name: `${l10n.artist.singular[locale]}:`,
                value: `\`${result.state.replaceAll(";", ",")}\``,
                inline: true,
            },
        ]);
    }
    embed
        .addFields([
            {
                name: `${l10n.link[locale]}:`,
                value: `${l10n.openInSpotify[locale].replace("{song}", `[${result.details}](https://open.spotify.com/track/${result.syncId})`)}`,
                inline: false,
            },
        ])
        .addFields([{ name: `\`${values[0]}\``, value: `​`, inline: true }])
        .setThumbnail(`https://i.scdn.co/image/${result.assets.largeImage.slice(8)}`)
        .setTimestamp()
        .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        });

    const lyricsButton = new ButtonBuilder().setCustomId("SPOTIFY_lyrics").setLabel(l10n.lyrics[locale]).setStyle("Primary");
    const button = new ActionRowBuilder().addComponents(lyricsButton);

    // send the embed
    interaction.reply({ embeds: [embed], components: [button] });
};
