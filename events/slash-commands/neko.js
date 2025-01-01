import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.neko;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.channel.id !== config.channels.nekochannel && interaction.user.id !== config.owner)
        return interaction.reply({
            content: l10n.nekoChannelOnly[locale].replace("{channel}", `<#${config.channels.nekochannel}>`),
            ephemeral: true,
        });

    if (!interaction.options.getString("type")) {
        const types = ['smug', 'woof', 'gasm', '8ball', 'goose', 'cuddle', 'avatar', 'slap', 'v3', 'pat', 'gecg', 'feed', 'fox_girl', 'lizard', 'neko', 'hug', 'meow', 'kiss', 'wallpaper', 'tickle', 'spank', 'waifu', 'lewd', 'ngif'];
        var type = types[Math.floor(Math.random() * types.length)];
    } else {
        var type = interaction.options.getString("type");
    }

    try {
        const { url } = await fetch("https://nekos.life/api/v2/img/" + type).then((response) => response.json());
        if (url) interaction.reply(url);
        else interaction.reply({
            content: l10n.error[locale],
            ephemeral: true,
        })
    } catch (error) {
        client.error(error, "neko.js");
        interaction.reply({
            content: l10n.error[locale],
            ephemeral: true,
        })
    }
};
