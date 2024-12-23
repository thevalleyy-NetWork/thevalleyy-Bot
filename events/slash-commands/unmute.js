const config = require("../../config.json");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.guild.members.cache.get(interaction.options.get("user").user.id))
        return interaction.reply({
            content: "Dieser Benutzer ist nicht auf diesem Server!",
            ephemeral: true,
        });

    const muteUser = interaction.options.get("user");
    const reason = interaction.options.getString("reason").substring(0, 255);
    const muteRole = interaction.guild.roles.cache.find((role) => role.name === "Muted Chat").id;

    if (muteUser.id == config.owner || muteUser.id == client.user.id) return interaction.reply("<:FeelsSusMan:870034696396996630>");
    if (muteUser.id == interaction.user.id) return interaction.reply("Sure, ~~Jan~~ " + interaction.user.username);
    if (!muteUser.member.roles.cache.has(muteRole) && Date.now() >= muteUser.member.communicationDisabledUntilTimestamp)
        return interaction.reply("`" + muteUser.user.tag + "` ist nicht gemuted.");

    try {
        muteUser.member.timeout(null, `Unmute von: ${interaction.user.tag}, Grund: ${reason}`);

        // db(`UPDATE discord set muted = 0 WHERE dcid = ${muteUser.user.id}`);
        muteUser.member.roles.remove(muteRole, `Unmute von: ${interaction.user.tag}, Grund: ${reason}`);
        interaction.reply("`" + muteUser.user.tag + "` kann nun wieder schreiben.");
        client.modLog(`${muteUser.user.tag} wurde von ${interaction.user.tag} wegen ${reason} entmuted.`, "unmute.js");
        muteUser.user
            .send(
                "Du hast von `" +
                    interaction.user.tag +
                    "` auf dem Server `" +
                    interaction.guild.name +
                    "` wieder Schreibrechte erhalten.\nGrund: `" +
                    reason +
                    "`"
            )
            .catch((error) => {
                client.log(error, "unmute.js");
            });
    } catch (error) {
        client.error(error, "unmute.js");
        interaction.reply("Es gab einen Fehler.");
    }
};
