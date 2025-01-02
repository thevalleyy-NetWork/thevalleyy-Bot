import { AttachmentBuilder, EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.qr;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    try {
        if (interaction.options._subcommand === "generate") {
            const data = encodeURI(interaction.options._hoistedOptions[0].value);
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}`;

            const attachment = new AttachmentBuilder().setFile(url).setName("qr.png");
            interaction.reply({
                content: `${l10n.generated[locale].replace("{text}", interaction.options._hoistedOptions[0].value.substring(0, 1000))}`,
                files: [attachment],
                ephemeral: true,
            });
            return;
        }

        if (interaction.options._subcommand === "scan") { //TODO: this is sadly not working
            await interaction.deferReply();
            client.log("Scanning QR code", "qr.js");

            if (
                interaction.options._hoistedOptions[0].attachment.contentType == "image/png" ||
                interaction.options._hoistedOptions[0].attachment.contentType == "image/jpeg" ||
                interaction.options._hoistedOptions[0].attachment.contentType == "image/jpg" ||
                interaction.options._hoistedOptions[0].attachment.contentType == "image/gif"
            ) {
                // post request to qrserver.com
                const url = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURIComponent(interaction.options._hoistedOptions[0].attachment.proxyURL)}`;

                const response = await fetch(url);
                var json = await response.json();

                if (json[0].symbol[0].error) {
                    client.error(json[0].symbol[0].error, "qr.js");
                    interaction.editReply({
                        content: l10n.noScan[locale],
                        ephemeral: true,
                    });
                    return
                }
                    
                const embed = new EmbedBuilder()
                    .setTitle(l10n.qrCode[locale])
                    .setColor(config.colors.default)
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: interaction.guild.iconURL(),
                    })
                    .setTimestamp()
                    .addFields([
                        { name: l10n.type[locale], value: json[0].type, inline: true },
                        {
                            name: l10n.content[locale],
                            value: json[0].symbol[0].data,
                            inline: true,
                        },
                    ])
                    .setImage(interaction.options._hoistedOptions[0].attachment.url);

                interaction.editReply({ embeds: [embed], ephemeral: true });
                return;
            } else {
                interaction.editReply({
                    content: l10n.fileType[locale],
                    ephemeral: true,
                });
                return;
            }
        }
    } catch (error) {
        client.error(json[0].symbol[0].error, "qr.js");
        interaction.editReply({
            content: l10n.error[locale],
            ephemeral: true,
        });    
    }
};
