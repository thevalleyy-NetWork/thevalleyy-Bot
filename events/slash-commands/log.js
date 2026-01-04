import { ButtonBuilder, EmbedBuilder } from "discord.js";
import Enmap from "enmap";

const logs = new Enmap({ name: "logs", autoFetch: true, fetchAll: false });

import getTime from "../../functions/gettime.js";
import paginationEmbed from "../../functions/pagination.js";
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.log;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    // TODO: search logs, only modlogs, serach by origin, serach by date
    if (!interaction.isChatInputCommand()) return;

    if (interaction.options._subcommand == "list") {
        const button0 = new ButtonBuilder().setCustomId("previousbtn").setLabel("◀️").setStyle("Secondary");
        const button1 = new ButtonBuilder().setCustomId("nextbtn").setLabel("▶️").setStyle("Secondary");

        const buttonList = [button0, button1];

        const id = interaction.options.getNumber("id");
        let amount = interaction.options.getNumber("amount");

        if (id) amount = 1;
        if (!amount) amount = 10;

        if (amount < 1 || amount > 100)
            return interaction.reply({
                content: l10n.illegalNumber[locale].replace("{min}", "1").replace("{max}", "100"),
                ephemeral: true,
            });

        try {
            let logArray = [];
            if (id) {
                const log = logs.get(id.toString());
                if (log) {
                    logArray[0] = [id, log];
                }
            } else {
                for (let i = 0; i < amount; i++) {
                    const log = logs.get((logs.size - i).toString());
                    if (log) {
                        logArray.push([logs.size - i, log]);
                    }
                }

                // logArray = logs.entries().slice(amount * -1);
            }

            if (logArray.length == 0) {
                // no specific log found
                if (id)
                    return interaction.reply({
                        content: l10n.noLog[locale].replace("{id}", id),
                        ephemeral: true,
                    });

                // no errors found
                return interaction.reply({
                    content: l10n.noLogs[locale],
                    ephemeral: true,
                });
            }

            const pages = [];
            for (let i = 0; i < logArray.length; i++) {
                const id = logArray[i][0];
                const log = logArray[i][1];

                const embed = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTitle(`${l10n.log[locale]} #${id}`)
                    .setDescription(`\`\`\`\n${log.message}\`\`\``)
                    .addFields([
                        {
                            name: l10n.id[locale],
                            value: `\`${id}\``,
                            inline: true,
                        },
                        {
                            name: l10n.origin[locale],
                            value: `\`${log.origin}\``,
                            inline: true,
                        },
                        {
                            name: l10n.modlog[locale],
                            value: log.modlog ? l10n.yes[locale] : l10n.no[locale],
                            inline: true,
                        },
                        {
                            name: l10n.timestamp[locale],
                            value: `\`\`\`\n${getTime(true, log.timestamp)}\`\`\` (<t:${Math.round(log.timestamp / 1000)}:R>)`,
                        },
                    ]);
                pages.push(embed);
            }

            paginationEmbed(interaction, pages, buttonList, 300000);
        } catch (err) {
            client.error(err, "log.js");
            interaction.reply({
                content: l10n.errorWhileFetching[locale],
                ephemeral: true,
            });
            return;
        }
        return;
    }

    // code für insert
    const message = interaction.options.getString("message");
    const modlog = interaction.options.getBoolean("modlog");
    const origin = interaction.options.getString("origin");

    if (modlog) {
        client.modLog(message, origin ? origin : "custom");
    } else {
        client.log(message, origin ? origin : "custom");
    }

    interaction.reply({ content: l10n.insert[locale], ephemeral: true });
};
