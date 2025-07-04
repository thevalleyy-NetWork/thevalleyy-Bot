import config from "../config.json" with { type: "json" };
import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.interactionCreate.ticket.delete;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 */
export default (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "TICKET_delete") return 

    const locale = interaction.locale == "de" ? "de" : "en";

    try {
        if (!interaction.channel.name.startsWith("🔒-")) return interaction.reply({ content: l10n.notClosed[locale], ephemeral: true });
        
        const modrole = interaction.guild.roles.cache.get(config.roles.moderator);
        const suprole = interaction.guild.roles.cache.get(config.roles.supporter);

        if (interaction.member.roles.cache.has(modrole.id) || interaction.member.roles.cache.has(suprole.id)) {
            client.log(`Ticket ${interaction.channel.name} was deleted by ${interaction.user.tag}.`, "ticket.delete.js");
            interaction.channel.delete().catch((err) => {
                client.error(err, "ticket.delete.js");
                interaction.reply({ content: l10n.error[locale], ephemeral: true });
            });
        } else {
            interaction.reply({
                content: l10n.noPermission[locale].replace("{modrole}", `<@&${modrole.id}>`).replace("{suprole}", `<@&${suprole.id}>`),
                ephemeral: true,
            });
        }
    } catch (err) {
        client.error(err, "ticket.delete.js");
    }
};
