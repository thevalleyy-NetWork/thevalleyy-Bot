import { ButtonBuilder, EmbedBuilder } from "discord.js";
import Enmap from "enmap";

const errors = new Enmap({ name: "errors", autoFetch: true, fetchAll: false });

import getTime from "../../functions/gettime.js";
import paginationEmbed from "../../functions/pagination.js";
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.error;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.options._subcommand == "list") {
        const button0 = new ButtonBuilder()
            .setCustomId("previousbtn")
            .setLabel("◀️")
            .setStyle("Secondary");

        const button1 = new ButtonBuilder()
            .setCustomId("nextbtn")
            .setLabel("▶️")
            .setStyle("Secondary");

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
            let errArray = [];
            if (id) {
                const error = errors.get(id.toString());
                if (error) {
                    errArray[0] = [id, error]
                }
            } else {
                for (let i = 0; i < amount; i++) {
                    const error = errors.get((errors.size - i).toString());
                    if (error) {
                        errArray.push([errors.size - i, error]);
                    }
                }

                // errArray = errors.entries().slice(amount * -1);
            }


            if (errArray.length == 0) {
                // no specific error found
                if (id) return interaction.reply(
                    {
                        content: l10n.noError[locale].replace("{id}", id),
                        ephemeral: true,
                    }
                );

                // no errors found
                return interaction.reply(
                    {
                        content: l10n.noErrors[locale],
                        ephemeral: true,
                    }
                )
            }

            // proceed if there are errors
            const pages = [];
            for (let i = 0; i < errArray.length; i++) {
                const id = errArray[i][0]
                const error = errArray[i][1];
                
                const embed = new EmbedBuilder()
                    .setColor(config.colors.error)
                    .setTitle(`${l10n.error[locale]} #${id}`)
                    .setDescription(`\`\`\`\n${error.message}\`\`\``)
                    .addFields([
                        {
                            name: l10n.id[locale],
                            value: `\`${id}\``,
                            inline: true,
                        },
                        {
                            name: l10n.origin[locale],
                            value: `\`${error.origin}\``,
                            inline: true,
                        },
                        {
                            name: l10n.timestamp[locale],
                            value: `\`\`\`\n${getTime(
                                true,
                                error.timestamp
                            )}\`\`\` (<t:${Math.round(error.timestamp / 1000)}:R>)`,
                        },
                    ]);
                pages.push(embed);
            }

            paginationEmbed(interaction, pages.reverse(), buttonList, 300000);
        } catch (err) {
            client.error(err, "error.js");
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
    const origin = interaction.options.getString("origin");

    client.error(message, origin ? origin : "custom");
    interaction.reply({content: l10n.insert[locale], ephemeral: true });
};
