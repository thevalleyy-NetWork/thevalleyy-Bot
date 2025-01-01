import { EmbedBuilder } from "discord.js";
import fs from "node:fs";
import config from "../../config.json" with { type: "json" };

import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.blacklist;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const user = interaction.options.get("user");

    if (!user) {
        try {
            if (client.blacklist.length == 0) {
                interaction.reply({
                    content: l10n.noEntries[locale],
                    ephemeral: true,
                });
                return;
            }
            const embed = new EmbedBuilder()
                .setTitle(l10n.embed.title[locale])
                .setDescription(client.blacklist.map((r) => `<@${r}>, \`${r}\``).join("\n"))
                .setColor(config.colors.default)
                .setTimestamp()
                .setFooter({
                    text: interaction.guild ? interaction.guild.name : interaction.user.tag,
                    iconURL: interaction.guild ? interaction.guild.iconURL() : interaction.user.avatarURL(),
                });
            interaction.reply({ embeds: [embed] });
        } catch (err) {
            client.error(err, "blacklist.js");
            interaction.reply(l10n.error[locale]);
        }
        return;
    }

    try {
        if (user.user.id == config.owner || user.user.id == client.user.id) {
            interaction.reply({content: l10n.notAllowed[locale].replace("{user}", `\`${user.user.tag}\``), ephemeral: true});
            return;
        }


        // user has been provided
        if (client.blacklist.includes(user.user.id)) {
            try {
                // remove from blacklist
                fs.writeFileSync(
                    "./data/blacklist.json",
                    JSON.stringify(client.blacklist.filter((x) => x != user.user.id))
                );
            } catch (err) {
                client.error(err, "blacklist.js");
                interaction.reply(l10n.error[locale]);
                return;
            }

            client.modLog(l10n.removed[locale].replace("{user}", user.user.tag).replace("{executor}", interaction.user.tag), "blacklist.js");
            interaction.reply({content: l10n.replyRemoved[locale].replace("{user}", `\`${user.user.tag}\``), ephemeral: true});
        } else {
            try {
                // add to blacklist
                client.blacklist.push(user.user.id);
                fs.writeFileSync("./data/blacklist.json", JSON.stringify(client.blacklist));
            } catch (err) {
                client.error(err, "blacklist.js");
                interaction.reply(l10n.error[locale]);
                return;
            }

            client.modLog(l10n.added[locale].replace("{user}", user.user.tag).replace("{executor}", interaction.user.tag), "blacklist.js");
            interaction.reply({content: l10n.replyAdded[locale].replace("{user}", `\`${user.user.tag}\``), ephemeral: true});
        }
    } catch (err) {
        client.error(err, "blacklist.js");
        interaction.reply(l10n.error[locale]);
    }
};
