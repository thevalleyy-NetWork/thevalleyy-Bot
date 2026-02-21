import { EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.pi;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();

    const base = interaction.options.getBoolean("hexadecimal") ? 16 : 10;
    const digits = interaction.options.getNumber("digits") || 16;
    const start = interaction.options.getNumber("start") || 0;
    const maxDigits = 1000;

    if (digits > maxDigits) return interaction.editReply(l10n.tooLarge[locale].replace("{max}", maxDigits.toString()));

    client.log(`Requesting ${digits} digits of pi (${interaction.user.tag})`, "pi.js");

    // interaction.deferReply();
    async function parse(response) {
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch {
            return { error: text };
        }
    }

    fetch(`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=${digits}&radix=${base}`).then(async (response) => {
        const res = await parse(response);
        if (res.error) interaction.editReply(l10n.error[locale] + "\n```" + res.error + "```");

        if (!res.content) return interaction.editReply(l10n.error[locale]);
        if (res.content) {
            const embed = new EmbedBuilder()
                .setColor(config.colors.default)
                .setTitle(l10n.pi[locale])
                .setDescription("```" + res.content + "```")
                .addFields(
                    {
                        name: res.content.length > 1 ? l10n.digits.plural[locale] : l10n.digits.singular[locale],
                        value: `\`\`${res.content.length}\`\``,
                        inline: true,
                    },
                    { name: l10n.start[locale], value: `\`\`${start}\`\``, inline: true },
                    { name: l10n.base[locale], value: `\`\`${base}\`\``, inline: true },
                )
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            interaction.editReply({ embeds: [embed] });
        }
    });
    return;
};
