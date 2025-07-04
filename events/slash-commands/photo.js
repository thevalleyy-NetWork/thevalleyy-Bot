import { ButtonBuilder, EmbedBuilder } from "discord.js";
import { createClient } from "pexels";

import paginationEmbed from "../../functions/pagination.js";
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.photo;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const query = interaction.options.getString("query").substring(0, 255);
    const orientation = interaction.options.getString("orientation") ? interaction.options.getString("orientation") : "";
    const size = interaction.options.getString("size") ? interaction.options.getString("size") : "";
    const color = interaction.options.getString("color") ? interaction.options.getString("color") : "";
    const localeSearch = interaction.options.getString("locale") ? interaction.options.getString("locale") : "";

    const pexels = createClient(config.keys.pexels);
    const array = [];

    const button0 = new ButtonBuilder().setCustomId("previousbtn").setLabel("◀️").setStyle("Secondary");
    const button1 = new ButtonBuilder().setCustomId("nextbtn").setLabel("▶️").setStyle("Secondary");

    const buttonList = [button0, button1];

    client.log(`Searching for ${query} (${interaction.user.tag})`, "photo.js");
    try {
        pexels.photos
            .search({
                query,
                orientation: orientation,
                size: size,
                color: color,
                locale: localeSearch,
                per_page: 80,
            })
            .then((result) => {
                if (result.photos.length == 0) return interaction.reply({content: l10n.noImages[locale], ephemeral: true});
                for (let i = 0; i < result.photos.length; i++) {
                    const photo = result.photos[i];
                    const embed = new EmbedBuilder()
                        .setTitle(l10n.imageSearch[locale] + " " + query)
                        .setColor(photo.avg_color)
                        .setTimestamp()
                        .setAuthor({
                            name: photo.photographer,
                            url: photo.photographer_url,
                        })
                        .setImage(photo.src.original + "?auto=compress")
                        .setFooter({
                            text: `${photo.width}x${photo.height}`,
                            iconURL: interaction.guild.iconURL(),
                        })
                        .setDescription(
                            `${l10n.copyrightString[locale].replace("{photo}", `[${photo.alt}](${photo.src.original})`).replace("{author}", `[${photo.photographer}](${photo.photographer_url})`).replace("{source}", `[Pexels](https://www.pexels.com)`)}`
                        );
                    array.push(embed);
                }
                paginationEmbed(interaction, array, buttonList, 120000);
            });
    } catch (error) {
        client.error(error, "photo.js");
        interaction.reply({content: l10n.error[locale], ephemeral: true});
    }
};
