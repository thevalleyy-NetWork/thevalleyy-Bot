module.exports = (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "TICKET_delete") return;

    try {
        if (!interaction.channel.name.startsWith("🔒-")) return;
        const modrole = interaction.guild.roles.cache.find(
            (role) => role.name === "Moderator"
        );

        if (interaction.member.roles.cache.has(modrole.id)) {
            interaction.channel.delete().catch((err) => {
                client.error(err, "ticket.delete.js");
                interaction.reply(
                    "Es gab einen Fehler beim Löschen eines Tickets: " + err
                );
            });
        } else {
            interaction.reply({
                content: `Nur Nutzer mit der Rolle <@&${modrole.id}> können Tickets löschen.`,
                ephemeral: true,
            });
        }
    } catch (err) {
        client.error(err, "ticket.delete.js");
    }
};
