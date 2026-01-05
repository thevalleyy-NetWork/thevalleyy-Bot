import config from "../config.json" with { type: "json" };

import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.interactionCreate.reactionRoles;
/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").ButtonInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.guild.id != config.guild) return;
    if (!interaction.customId.startsWith("REACTIONROLE")) return;

    const locale = interaction.locale == "de" ? "de" : "en";

    try {
        var list = {
            news: interaction.message.guild.roles.cache.get(config.roles.reactionroles.news).id,
            botnews: interaction.message.guild.roles.cache.get(config.roles.reactionroles.botnews).id,
            minecraft: interaction.message.guild.roles.cache.get(config.roles.reactionroles.minecraft).id,
        };
    } catch (error) {
        // the roles are not set up correctly
        client.error(l10n.error[locale], "reactionRoles.js");
    }

    try {
        const member = interaction.member; // interaction.message.guild.members.fetch(interaction.user.id);
        const action = interaction.customId.split("_")[1].split(".")[0]; // add or remove
        const role = list[interaction.customId.split("_")[1].split(".")[1]]; // "news", "botNews", "minecraft"

        if (action === "add") {
            if (member.roles.cache.has(role))
                return interaction.reply({
                    content: l10n.alreadyHas[locale].replace("{role}", `<@&${role}>`),
                    ephemeral: true,
                });

            member.roles.add(role);

            client.log(
                l10n.added[locale].replace("{role}", interaction.customId.split("_")[1].split(".")[1]).replace("{member}", member.user.tag),
                "reactionRoles.js"
            );
            interaction.reply({
                content: l10n.addedString[locale].replace("{role}", `<@&${role}>`),
                ephemeral: true,
            });
        } else {
            if (!member.roles.cache.has(role))
                return interaction.reply({
                    content: l10n.alreadyRemoved[locale].replace("{role}", `<@&${role}>`),
                    ephemeral: true,
                });

            member.roles.remove(role);

            client.log(
                l10n.removed[locale].replace("{role}", interaction.customId.split("_")[1].split(".")[1]).replace("{member}", member.user.tag),
                "reactionRoles.js"
            );
            interaction.reply({
                content: l10n.removedString[locale].replace("{role}", `<@&${role}>`),
                ephemeral: true,
            });
        }
    } catch (error) {
        client.error(error, "reactionRoles.js");
    }
};
