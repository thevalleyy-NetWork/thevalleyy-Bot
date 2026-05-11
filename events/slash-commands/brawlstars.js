import { EmbedBuilder, AttachmentBuilder } from "discord.js";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.brawlstars;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const iconurl = interaction.guild.iconURL();
    const id = interaction.options.getString("id").replaceAll("#", "");

    // request api
    const url = `https://brawltime.ninja/api/render/profile/${id}/best.png?background=university_lobby.jpg`;

    try {
        // test if the id is valid
        const response = await fetch(url);
        if (!response.ok) {
            interaction.reply({
                content: l10n.notFound[locale].replace("{id}", "#" + id),
                ephemeral: true,
            });

            return;
        }

        const attachment = new AttachmentBuilder().setFile(url).setName("brawlstars.png");

        interaction.reply({
            files: [attachment],
        });
    } catch (err) {
        // some strange error, should never happen but just in case
        client.error(err, "brawlstars.js");
        const errorEmbed = new EmbedBuilder()
            .setColor(config.colors.error)
            .setTitle(l10n.error[locale])
            .setDescription("`" + err + "`")
            .setFooter({ text: interaction.guild.name, iconURL: iconurl })
            .setTimestamp();
        interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
};
