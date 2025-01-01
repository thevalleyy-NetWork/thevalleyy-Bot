import { EmbedBuilder } from "discord.js";
import fs from "node:fs";
import util from "minecraft-server-util";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.mc;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const ip = interaction.options.getString("ip") ? interaction.options.getString("ip") : config.minecraft.ip;
    const port = interaction.options.getString("port") ? interaction.options.getString("port") : config.minecraft.port;

    client.log(`Pinging: IP: ${ip} | Port: ${port}`, "mc.js");

    try {
        await interaction.deferReply();
        const response = await util.status(ip, parseInt(port)).catch((error) => {
            interaction.followUp(l10n.notReachable[locale]);
        })

        if (!response) return;

        const embed = new EmbedBuilder()
            .setTitle(ip + (port == "25565" ? `` : `:${port}`))
            .setTimestamp()
            .setColor(config.colors.default)
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL(),
            })
            .addFields([
                {
                    name: `${l10n.players[locale]}:`,
                    value: `(${response.players.online}/${response.players.max})`,
                    inline: true,
                },
                {
                    name: `${l10n.version[locale]}:`,
                    value: `${response.version.name} (${response.version.protocol})`,
                    inline: true,
                },
                {
                    name: `${l10n.ping[locale]}:`,
                    value: response.roundTripLatency.toString() + "ms",
                    inline: true,
                },
            ])

            .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + ip + ":" + port)
            .setImage(`http://status.mclive.eu/${ip}/${ip}/${port}/banner.png`);

        if (ip == config.minecraft.ip && port == config.minecraft.port) {
            const json = JSON.parse(fs.readFileSync("./data/mcstats.json", "utf8"));

            embed.addFields([
                {
                    name: `${l10n.playerRecord[locale]}:`,
                    value: json.mostPlayers.toString(),
                    inline: true,
                },
                {
                    name: `${l10n.reached[locale]}:`,
                    value: `<t:${json.date}:R>`,
                    inline: true,
                },
                {
                    name: `${l10n.lastPing[locale]}:`,
                    value: `<t:${json.lastPinged}:R>`,
                    inline: true,
                },
            ]);
        }
        embed.addFields([
            {
                name: "​",
                value: `[${ip} ${l10n.onNameMC[locale]}](https://namemc.com/server/${ip}:${port})`,
                inline: false,
            },
        ]);

        await interaction.followUp({ embeds: [embed] });
    } catch (error) {
        interaction.followUp(
            l10n.error[locale],
        );
        client.error(error, "mc.js");
    }
};
