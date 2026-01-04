import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.mute;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const muteUser = interaction.options.get("user");
    const reason = interaction.options.getString("reason").substring(0, 255);
    const duration = interaction.options.getString("duration");

    if (!interaction.guild.members.cache.get(muteUser.user.id))
        return interaction.reply({
            content: l10n.notOnThisServer[locale],
            ephemeral: true,
        });

    const muteRole = interaction.guild.roles.cache.get(config.roles.mutechat)?.id;
    if (!muteRole) return interaction.reply({ content: l10n.noMuteRole[locale], ephemeral: true });

    if (muteUser.id == config.owner || muteUser.id == client.user.id) return interaction.reply({ content: l10n.owner[locale], ephemeral: true });
    if (muteUser.id == interaction.user.id) return interaction.reply({ content: l10n.selfMute[locale], ephemeral: true });
    if (muteUser.member.roles.cache.has(muteRole) || Date.now() <= muteUser.member.communicationDisabledUntilTimestamp)
        return interaction.reply({
            content: l10n.alreadyMuted[locale].replace("{user}", muteUser.user.tag),
            ephemeral: true,
        });

    try {
        if (duration == 0) {
            // Permanent mute
            // TODO: update in enmap
            muteUser.member.roles.add(muteRole, l10n.muteString[locale].replace("{executor}", interaction.user.tag).replace("{reason}", reason));
            interaction.reply({
                content: l10n.muted[locale].replace("{user}", muteUser.user.tag),
                ephemeral: true,
            });

            client.modLog(
                l10n.muteLogPerm[locale].replace("{user}", muteUser.user.tag).replace("{executor}", interaction.user.tag).replace("{reason}", reason),
                "mute.js"
            );

            muteUser.user
                .send(
                    l10n.muteMessage[locale]
                        .replace("{executor}", interaction.user.tag)
                        .replace("{guild}", interaction.guild.name)
                        .replace("{duration}", "Permanent")
                        .replace("{reason}", reason)
                )
                .catch((error) => {}); // Ignore errors -> user has DMs disabled
        } else {
            muteUser.member.timeout(+duration * 60000, l10n.muteString[locale].replace("{executor}", interaction.user.tag).replace("{reason}", reason));
            interaction.reply({
                content: l10n.muted[locale].replace("{user}", muteUser.user.tag),
                ephemeral: true,
            });

            client.modLog(
                l10n.muteLog[locale]
                    .replace("{user}", muteUser.user.tag)
                    .replace("{executor}", interaction.user.tag)
                    .replace("{reason}", reason)
                    .replace("{duration}", +duration),
                "mute.js"
            );

            muteUser.user
                .send(
                    l10n.timeoutMessage[locale]
                        .replace("{executor}", interaction.user.tag)
                        .replace("{guild}", interaction.guild.name)
                        .replace("{duration}", `<t:${Math.round(Date.now() / 1000) + +duration * 60}:R> minutes`)
                        .replace("{reason}", reason)
                )
                .catch((error) => {});
        }
    } catch (error) {
        client.error(error, "mute.js");
        interaction.reply({
            content: l10n.error[locale],
            ephemeral: true,
        });
    }
};
