import { EmbedBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import pck from "../../package.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.packages

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const array = [];
    for (let i = 0; i < Object.keys(pck.dependencies).length; i++) {
        array.push(Object.keys(pck.dependencies)[i] + ": v" + Object.values(pck.dependencies)[i].replace("^", ""));
    }

    const embed = new EmbedBuilder()
        .setColor(config.colors.default)
        .setTitle(pck.name + " v" + pck.version)
        .setDescription(`${l10n.packages[locale]}:\n` + `\`\`\`${array.join(", ").replaceAll(", ", ",\n")}\`\`\``)
        .setThumbnail(client.user.avatarURL())
        .addFields([
            {
                name: `${l10n.startFile[locale]}:`,
                value: "`" + pck.main + "`",
                inline: true,
            },
            {
                name: `${l10n.description[locale]}:`,
                value: "`" + pck.description + "`",
                inline: true,
            },
        ]);

    interaction.reply({ embeds: [embed] });
};
