import { EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.horny;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const iconurl = interaction.guild.iconURL();
    const user = interaction.options.get("user") ? interaction.options.get("user").user : interaction.user;
    const avatarURL = user.avatarURL({ extension: "png", size: 4096 });

    // request api
    const response = await fetch(`https://api.some-random-api.com/canvas/misc/horny?avatar=${avatarURL}`);

    if (!response.ok) {
        const data = await response.json();
        const errorEmbed = new EmbedBuilder()
            .setColor(config.colors.error)
            .setTitle(l10n.error[locale])
            .setDescription("`" + data.error + "`")
            .setFooter({ text: interaction.guild.name, iconURL: iconurl })
            .setTimestamp();
        interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        return;
    } else {
        try {
            const buffer = Buffer.from(await response.arrayBuffer());
            const file = { attachment: buffer, name: "horny.png" };
            interaction.reply({ files: [file] });
        } catch (err) {
            // some strange image processing error, should never happen but just in case
            client.error(err, "horny.js");
            const errorEmbed = new EmbedBuilder()
                .setColor(config.colors.error)
                .setTitle(l10n.error[locale])
                .setDescription("`" + err.message + "`")
                .setFooter({ text: interaction.guild.name, iconURL: iconurl })
                .setTimestamp();
            interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
};
