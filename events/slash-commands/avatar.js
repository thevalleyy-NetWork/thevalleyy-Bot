import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.avatar

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.options.get("user")) {
        interaction.reply(interaction.user.avatarURL({ size: 4096 }));
    } else {
        interaction.reply(interaction.options.get("user").user.avatarURL({ size: 4096 })).catch((error) => {
            interaction.reply(l10n.error[locale]);
            client.error(error, "avatar.js");
        });
    }
};
