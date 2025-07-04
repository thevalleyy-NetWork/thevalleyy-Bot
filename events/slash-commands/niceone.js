import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.niceone;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const user = interaction.options.get("user");

    if (!interaction.guild.members.cache.get(user.user.id))
        return interaction.reply({
            content: l10n.notOnThisServer[locale],
            ephemeral: true,
        });

    const role = interaction.guild.roles.cache.get(config.roles.niceone).id;
    if (!role) return interaction.reply({ content: l10n.noNiceOneRole[locale], ephemeral: true });

    if (user.user.id == config.owner || user.user.id == client.user.id) return interaction.reply({ content: l10n.owner[locale], ephemeral: true });
    if (user.user.id == interaction.user.id) return interaction.reply({ content: l10n.selfNiceOne[locale], ephemeral: true });
    
    try {
        if (user.member.roles.cache.has(role)) {
            user.member.roles.remove(role);
            // TODO: enmap
            // TODO: reason für niceone
            // TODO: message an user

            interaction.reply({ content: l10n.removed[locale].replace("{user}", "`" + user.user.tag + "`").replace("{executor}", "`" + interaction.user.tag + "`"), ephemeral: true });
            client.modLog(l10n.removed[locale].replace("{user}", user.user.tag).replace("{executor}", interaction.user.tag), "niceone.js");
        } else {
            user.member.roles.add(role);

            interaction.reply({ content: l10n.added[locale].replace("{user}", "`" + user.user.tag + "`").replace("{executor}", "`" + interaction.user.tag + "`"), ephemeral: true });
            client.modLog(l10n.added[locale].replace("{user}", user.user.tag).replace("{executor}", interaction.user.tag), "niceone.js");
        }
    } catch (error) {
        client.error(error, "niceone.js");
        interaction.reply({ content: l10n.error[locale], ephemeral: true });
    }
};
