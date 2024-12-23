import { EmbedBuilder } from "discord.js";
import util from "minecraft-server-util";
import fs from "fs";

import config from "./../config.json" with { type: "json" };

export default async (client) => {
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
                    .setTitle("Neuer Spielerrekord!")
                    .setDescription(`**${response.players.online}** Spieler online!\nVorheriger Rekord: ${json.mostPlayers} Spieler`)
                    .setFooter({text: `${config.minecraft.ip}${config.minecraft.port == 25565 ? "" : `:${config.minecraft.port}`}`});

                await client.channels.cache.get(config.channels.minecraftchannel).send({ embeds: [embed] });
            }

            const wartungen = response.version.name.toString().toLowerCase().includes("wartungen");
            const time = Math.round(new Date().getTime() / 1000);
            const online = response.players.online;
            const max = response.players.max;
            const most = newData.mostPlayers;

            return { wartungen, time, online, max, most };
        } catch (error) {
            client.error(error, "mcping.js");
            return null;
        }
    }

    async function setTopic({ wartungen, time, online, max, most }) {
        if (!time) return;

        const ipString = `${config.minecraft.ip}${config.minecraft.port == 25565 ? "" : `:${config.minecraft.port}`}`;

        if (wartungen) {
            await client.channels.cache
                .get(config.channels.minecraftchannel)
                .setTopic(`${ipString} **--** <:warning:981932931343855636> Wartungen  **--**  Letzter Ping: <t:${time}:R>`);
        } else
            await client.channels.cache
                .get(config.channels.minecraftchannel)
                .setTopic(`${ipString} (${online}/${max})  **--**  Letzter Ping: <t:${time}:R>  **--**  🏆 ${most}`);
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
