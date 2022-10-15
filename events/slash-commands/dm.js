const config = require("../../config.json");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (
        !interaction.guild.members.cache.get(
            interaction.options.get("user").user.id
        )
    )
        return interaction.reply({
            content: "Dieser Benutzer ist nicht auf diesem Server!",
            ephemeral: true,
        });

    const user = interaction.options.get("user");
    const text = interaction.options.getString("content");

    if (user.user.id == config.owner || user.user.id == client.user.id) {
        interaction.reply(
            "DMs an `" + user.user.username + "` sind nicht erlaubt."
        );
        return;
    }

    try {
        await user.user.send(text.substring(0, 2000));
        interaction.reply({ content: "✅", ephemeral: true });
        interaction.channel.send(
            "Die Nachricht wurde an `" + user.user.tag + "` versandt."
        );
        client.modLog(
            `${interaction.user.tag} hat ${user.user.tag} eine DM geschickt.`,
            "dm.js"
        );
    } catch (error) {
        client.error(error, "dm.js");
        interaction.reply(
            "Die Nachricht konnte nicht an `" +
                user.user.tag +
                "` versendet werden."
        );
    }
};
