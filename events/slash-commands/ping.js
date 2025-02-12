import { EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.ping;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;
    const time = Date.now();

    let tps = 0;
    let s = Date.now();
    while (Date.now() - s <= 1) tps++;
    tps *= 1000; //:HugTomate:

    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `\`${days}\` ${days == 1 ? l10n.uptime.days.singular[locale] : l10n.uptime.days.plural[locale]}, \`${hours}\` ${
        hours == 1 ? l10n.uptime.hours.singular[locale] : l10n.uptime.hours.plural[locale]
    }, \`${minutes}\` ${minutes == 1 ? l10n.uptime.minutes.singular[locale] : l10n.uptime.minutes.plural[locale]} ${
        l10n.uptime.and[locale]
    } \`${seconds}\` ${seconds == 1 ? l10n.uptime.seconds.singular[locale] : l10n.uptime.seconds.plural[locale]}`;

    const iconurl = interaction.guild.iconURL();

    const prePingEmbed = new EmbedBuilder().setTitle("...").setColor(config.colors.default);
    interaction.reply({ embeds: [prePingEmbed] }).then((m) => {
        const pingEmbed = new EmbedBuilder()
            .setTitle(l10n.botInfo[locale])
            .addFields([
                {
                    name: `${l10n.bot[locale]}:`,
                    value: `\`${(time - interaction.createdTimestamp).toString()}\`ms`,
                    inline: true,
                },
                {
                    name: `${l10n.api[locale]}:`,
                    value: `\`${Math.round(client.ws.ping)}\`ms`,
                    inline: true,
                },
                { name: `${l10n.tps[locale]}:`, value: `\`${tps}\``, inline: true },
                { name: `${l10n.uptimeWord[locale]}:`, value: `${uptime}`, inline: true },
            ])
            .setTimestamp()
            .setColor(config.colors.default);

        if (iconurl) pingEmbed.setFooter({ text: interaction.guild.name, iconURL: iconurl });
        else pingEmbed.setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

        interaction.editReply({ embeds: [pingEmbed] });
    });
};
