import config from "../../config.json" with { type: "json" };

import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.dm;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.guild.members.cache.get(interaction.options.get("user").user.id))
        return interaction.reply({
            content: l10n.notAvailable[locale].replace("{user}", interaction.options.get("user").user.tag),
            ephemeral: true,
        });

    const user = interaction.options.get("user");
    const text = interaction.options.getString("content");

    if (user.user.id == config.owner || user.user.id == client.user.id) {
        interaction.reply({
            content: l10n.notAllowed[locale].replace("{user}", user.user.tag),
            ephemeral: true,
        });
        return;
    }

    try {
        await user.user.send(text.substring(0, 2000));
        interaction.reply({ content: l10n.success[locale].replace("{user}", user.user.tag), ephemeral: true });
        client.log(l10n.log[locale].replace("{executor}", interaction.user.tag).replace("{user}", user.user.tag), "dm.js");
    } catch (error) {
        interaction.reply({ content: l10n.error[locale].replace("{user}", user.user.tag), ephemeral: true });
    }
};
