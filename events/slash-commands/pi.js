import { EmbedBuilder } from "discord.js";
import BigNumber from "bignumber.js";
import parseResponse from "../../functions/parseResponse.js";
import computePI from "../../functions/computePI.js";

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

    // min number of digits to put in one embed
    const minDigits = 1;
    // max number of digits to put in one embed
    const maxDigits = 1000;
    // max number of digits to calculate using chudnovsky's formula
    const calcLimit = 5000;
    // string to store the result in
    let result = "";
    // was the result calculated or retrieved?
    let calculated = false;
    // high resulution time
    let hrend = null;

    if (digits > maxDigits || digits < minDigits) return interaction.editReply(l10n.outOfRange[locale].replace("{max}", maxDigits).replace("{min}", minDigits));

    client.log(`Requesting ${digits} digits of pi (${interaction.user.tag})`, "pi.js");

    // decide on whether to calculate pi or request it from an API
    if (digits + start > calcLimit) {
        // calculating would exceed the limit, so just request it

        await fetch(`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=${digits}&radix=${base}`).then(async (response) => {
            const res = await parseResponse(response);

            if (res.error) return interaction.editReply(l10n.error[locale] + "\n```" + res.error + "```");
            if (!res.content) return interaction.editReply(l10n.error[locale]);

            result = res.content;
        });

        calculated = false;
    } else {
        // pi can be calculated
        const hrstart = process.hrtime();

        // the function outputs pi with a decimal point (3.1415) -> we have to replace the point
        // it also outputs one more digit than we need, to to make up for the point and for the digit we shorten it by two chars
        const piPlusOne = await computePI(start + digits);
        const pi = piPlusOne.replace(".", "").substring(start, piPlusOne.length - 2);

        if (base == 16) {
            // transform the digits to hex in a weird way
            let hexString = start == 0 ? "3" : "";
            let tempNum = new BigNumber("0." + pi.substring(start == 0 ? 1 : 0, pi.length));

            for (let i = 1; i < digits; i++) {
                const nextNum = tempNum.multipliedBy(16);
                const nextHex = nextNum.integerValue(BigNumber.ROUND_DOWN);
                tempNum = nextNum.minus(nextHex);
                hexString = hexString.concat(parseInt(nextHex.toString()).toString(16));
            }

            result = hexString;
        } else {
            result = pi;
        }

        hrend = process.hrtime(hrstart);

        calculated = true;
    }

    const embed = new EmbedBuilder()
        .setColor(config.colors.default)
        .setTitle(l10n.pi[locale])
        .setDescription("```" + result + "```")
        .addFields(
            {
                name: result.length == 1 ? l10n.digits.singular[locale] : l10n.digits.plural[locale],
                value: `\`\`${result.length}\`\``,
                inline: true,
            },
            { name: l10n.start[locale], value: `\`\`${start}\`\``, inline: true },
            { name: l10n.base[locale], value: `\`\`${base}\`\``, inline: true },
            { name: l10n.origin[locale], value: `\`\`${calculated ? l10n.calculated[locale] : l10n.retrieved[locale]}\`\``, inline: true },
        )
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTimestamp();

    if (calculated) {
        embed.addFields({ name: l10n.time[locale], value: `\`\`${hrend[0]}s ${hrend[1] / 1000000}ms\`\``, inline: true });
    }

    if (calculated && base == 16) {
        embed.addFields({ name: "⚠️", value: l10n.precisionWarning[locale] });
    }

    interaction.editReply({ embeds: [embed] });
};
