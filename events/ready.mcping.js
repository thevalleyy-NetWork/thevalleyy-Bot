import { EmbedBuilder } from "discord.js";
import util from "minecraft-server-util";
import fs from "fs";

import config from "./../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.ready.mcping;

/**
 * @param {import("discord.js").Client} client
 */
export default async (client) => {
    const locale = await client.channels.cache.get(config.channels.minecraftchannel)?.guild.preferredLocale == "de" ? "de" : "en";

    async function ping() {
        try {
            const response = await util.status(config.minecraft.ip, config.minecraft.port);
            if (!response) return null;

            const json = JSON.parse(fs.readFileSync("./data/mcstats.json", "utf8"));
            const newData = {
                mostPlayers: Math.max(json.mostPlayers, response.players.online).toString(),
                date: json.mostPlayers < response.players.online ? Math.round(new Date().getTime() / 1000).toString() : json.date,
                lastPinged: Math.round(new Date().getTime() / 1000).toString(),
            };

            fs.writeFileSync("./data/mcstats.json", JSON.stringify(newData, null, 4), "utf8");

            if (json.mostPlayers < response.players.online.toString()) {
                const embed = new EmbedBuilder()
                    .setColor(config.colors.info)
                    .setTitle(l10n.newRecord[locale])
                    .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + config.minecraft.ip + ":" + config.minecraft.port)
                    .setDescription(l10n.description[locale].replace("{players}", response.players.online).replace("{oldRecord}", json.mostPlayers))
                    .setFooter({text: `${config.minecraft.ip}${config.minecraft.port == 25565 ? "" : `:${config.minecraft.port}`}`});

                await client.channels.cache.get(config.channels.minecraftchannel).send({ embeds: [embed] });
            }

            const wartungen = response.version.name.toString().toLowerCase().includes("wartungen");
            const time = Math.round(new Date().getTime() / 1000);
            const online = response.players.online;
            const max = response.players.max;
            const most = newData.mostPlayers;

            return { wartungen: wartungen, time: time, online: online, max: max, most: most };
        } catch (error) {
            return null; // this error occurs, when the server is offline
        }
    }

    async function setTopic(ping) {
        if (!ping) return;
        const { wartungen, time, online, max, most } = ping;

        const ipString = `${config.minecraft.ip}${config.minecraft.port == 25565 ? "" : `:${config.minecraft.port}`}`;

        if (wartungen) {
            await client.channels.cache
                .get(config.channels.minecraftchannel)
                .setTopic(`${ipString} **--** <:warning:981932931343855636> ${l10n.maintenance[locale]}  **--**  ${l10n.lastPinged[locale]}: <t:${time}:R>`);
        } else
            await client.channels.cache
                .get(config.channels.minecraftchannel)
                .setTopic(`${ipString} (${online}/${max})  **--**  ${l10n.lastPinged[locale]}: <t:${time}:R>  **--**  🏆 ${most}`);
    }

    try {
        await setTopic(await ping());
        setInterval(async () => {
            await setTopic(await ping());
        }, 302000); // 5 minutes and 2 seconds
    } catch (error) {
        client.error(error, "mcping.js");
    }
};
