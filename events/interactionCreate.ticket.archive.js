import config from "../config.json" with { type: "json" };
import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.interactionCreate.ticket.archive;

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").ButtonInteraction} interaction
 */
export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "TICKET_archive") return;

    const locale = interaction.locale == "de" ? "de" : "en";

    try {
        if (!interaction.channel.name.startsWith("🔒-")) return interaction.reply({ content: l10n.notClosed[locale], ephemeral: true });

        const modrole = interaction.guild.roles.cache.get(config.roles.moderator);
        const suprole = interaction.guild.roles.cache.get(config.roles.supporter);
        const category = interaction.guild.channels.cache.get(config.channels.archivecategory);

        if (interaction.member.roles.cache.has(modrole.id) || interaction.member.roles.cache.has(suprole.id)) {
            interaction.channel.setParent(category.id);
            interaction.message.delete();
            interaction.channel.send(l10n.success[locale].replace("{executor}", interaction.user.tag));
            interaction.deferUpdate();
            interaction.channel.setName(interaction.channel.name.replace("🔒", "📑"));
            client.log(`Ticket ${interaction.channel.name} was archived by ${interaction.user.tag}.`, "ticket.archive.js");
        } else {
            interaction.reply({
                content: l10n.noPermission[locale].replace("{modrole}", `<@&${modrole.id}>`).replace("{suprole}", `<@&${suprole.id}>`),
                ephemeral: true,
            });
        }
    } catch (err) {
        interaction.reply({ content: l10n.error[locale], ephemeral: true });
        client.error(err, "ticket.archive.js");
    }
};
