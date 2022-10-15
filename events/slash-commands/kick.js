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
    const reason = interaction.options.getString("reason");

    if (user.id === interaction.user.id)
        return interaction.reply({
            content:
                "Du kannst dich nicht selbst kicken, " +
                interaction.user.username,
            ephemeral: true,
        });

    try {
        try {
            await user.user.send(
                "Du wurdest auf dem Server `" +
                    interaction.guild.name +
                    "`" +
                    (reason ? " mit dem Grund `" + reason + "` " : " ") +
                    "von `" +
                    interaction.user.tag +
                    "` gekickt."
            );
        } catch (e) {
            client.error(e, "kick.js");
        }

        await user.member
            .kick(reason + ", Kick von: " + interaction.user.tag)
            .catch((e) => {
                interaction.reply({
                    content:
                        "Ich konnte den User nicht kicken, " +
                        interaction.user.username,
                    ephemeral: true,
                });
                return;
            });
        await interaction.reply(
            "Der User `" +
                user.user.tag +
                "` wurde mit dem Grund `" +
                reason +
                "` gekickt."
        );
        client.modLog(
            `${user.user.tag} wurde von ${interaction.user.tag} wegen ${reason} gekickt.`,
            "kick.js"
        );
    } catch (error) {
        client.error(error, "kick.js");
    }
};
