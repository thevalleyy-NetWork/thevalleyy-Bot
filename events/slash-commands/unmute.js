import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.unmute;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const muteUser = interaction.options.get("user");
    const reason = interaction.options.getString("reason").substring(0, 255);

    if (!interaction.guild.members.cache.get(muteUser.user.id))
        return interaction.reply({
            content: l10n.notOnThisServer[locale],
            ephemeral: true,
        });

        const muteRole = interaction.guild.roles.cache.get(config.roles.mutechat)?.id;
    if (!muteRole) return interaction.reply({ content: l10n.noMuteRole[locale], ephemeral: true });

    if (muteUser.id == config.owner || muteUser.id == client.user.id) return interaction.reply({ content: l10n.owner[locale], ephemeral: true });
    if (muteUser.id == interaction.user.id) return interaction.reply({ content: l10n.selfMute[locale], ephemeral: true });
    if (!muteUser.member.roles.cache.has(muteRole) && Date.now() >= muteUser.member.communicationDisabledUntilTimestamp)
        return interaction.reply({
            content: l10n.notMuted[locale].replace("{user}", muteUser.user.tag),
            ephemeral: true,
        });

    try {
        // TODO: update in enmap

        muteUser.member.timeout(null, l10n.unmuteString[locale].replace("{executor}", interaction.user.tag).replace("{reason}", reason));
        muteUser.member.roles.remove(muteRole, l10n.unmuteString[locale].replace("{executor}", interaction.user.tag).replace("{reason}", reason));

        interaction.reply({
            content: l10n.unmuted[locale].replace("{user}", muteUser.user.tag),
            ephemeral: true,
        });

        client.modLog(l10n.unmuteLog[locale].replace("{user}", muteUser.user.tag).replace("{executor}", interaction.user.tag).replace("{reason}", reason), "unmute.js");

        muteUser.user
            .send( // TODO: test if this works
                l10n.unmuteMessage[locale]
                    .replace("{executor}", interaction.user.tag)
                    .replace("{guild}", interaction.guild.name)
                    .replace("{reason}", reason)
            )
            .catch((error) => {});
    } catch (error) {
        client.error(error, "unmute.js");
        interaction.reply({
            content: l10n.error[locale],
            ephemeral: true,
        });
    }
};
