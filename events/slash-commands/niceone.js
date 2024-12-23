const config = require("../../config.json");

export default (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.guild.members.cache.get(interaction.options.get("user").user.id))
        return interaction.reply({
            content: "Dieser Benutzer ist nicht auf diesem Server!",
            ephemeral: true,
        });

    const user = interaction.options.get("user");
    const role = interaction.guild.roles.cache.find((role) => role.name === "Nice One").id;

    if (user.user.id == config.owner || user.user.id == client.user.id) return interaction.reply("<:3Head:786252274204016670>");
    if (user.user.id == interaction.user.id) return interaction.reply("Versuchs mal mit `/ban @" + interaction.user.username + "`");

    try {
        if (user.member.roles.cache.has(role)) {
            user.member.roles.remove(role);
            // db(`UPDATE discord set niceone = 0 WHERE dcid = ${user.user.id}`);

            interaction.reply("`" + user.user.tag + "` wurde `Nice One` entzogen.");
            client.modLog(`${user.user.tag} wurde von ${interaction.user.tag} Nice One entzogen.`, "niceone.js");
        } else {
            user.member.roles.add(role);
            // db(`UPDATE discord set niceone = 1 WHERE dcid = ${user.user.id}`);

            interaction.reply("`" + user.user.tag + "` hat `Nice One` bekommen.");
            client.modLog(`${user.user.tag} hat von ${interaction.user.tag} Nice One erhalten.`, "niceone.js");
        }
    } catch (error) {
        client.error(error, "niceone.js");
        interaction.reply("Ein Fehler ist aufgetreten.");
    }
};
