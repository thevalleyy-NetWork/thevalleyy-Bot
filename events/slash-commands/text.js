import { PermissionsBitField } from "discord.js";

import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.text;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const text = interaction.options.getString("text");
    const channel = interaction.options.getChannel("channel") || interaction.channel;

    if (!channel) return interaction.reply({ content: l10n.noChannel[locale], ephemeral: true });

    // has the user permission to send messages in the channel?
    if (
        !channel
            .permissionsFor(interaction.member)
            .has(PermissionsBitField.Flags.ViewChannel || !channel.permissionsFor(interaction.member).has(PermissionsBitField.Flags.SendMessages))
    ) {
        return interaction.reply({ content: l10n.noPermission[locale], ephemeral: true });
    }

    if (interaction.member.permissions.has(PermissionsBitField.Flags.MentionEveryone)) {
        interaction.guild.channels.cache.get(channel.id).send({
            content: text.substring(0, 2000),
        });
    } else {
        interaction.guild.channels.cache.get(channel.id).send({
            content: text.substring(0, 2000),
            allowedMentions: { parse: [] },
        });
    }

    interaction.reply({ content: "Done", ephemeral: true });
};
