function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "TICKET_archive") return;

    try {
        if (!interaction.channel.name.startsWith("🔒-")) return; // TODO: test this

        const modrole = interaction.guild.roles.cache.find((role) => role.name === "Moderator"); // TODO: change to config
        const category = interaction.guild.channels.cache.find((c) => c.name === "Archiv");

        if (interaction.member.roles.cache.has(modrole.id)) {
            interaction.channel.setParent(category.id);
            interaction.message.delete();
            interaction.channel.send("Das Ticket wurde archiviert. Ausführender: `" + interaction.user.tag + "`");
            interaction.deferUpdate();
            await delay(900000);
            interaction.channel.setName(interaction.channel.name.replace("🔒", "📑"));
        } else {
            interaction.reply({
                content: `Nur Nutzer mit der Rolle <@&${modrole.id}> können Tickets archivieren.`,
                ephemeral: true,
            });
        }
    } catch (err) {
        interaction.channel.send("Es gab einen Fehler beim Archivieren eines Tickets: " + err);
        client.error(err, "ticket.archive.js");
    }
};
