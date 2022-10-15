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
    const dmdays = interaction.options.get("dmdays");

    if (user.id === interaction.user.id)
        return interaction.reply({
            content:
                "Du kannst dich nicht selbst bannen, " +
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
                    "` gebannt."
            );
        } catch (e) {
            client.error(e, "ban.js");
        }

        if (dmdays) {
            days = 7;
        } else {
            days = 0;
        }
        await user.member
            .ban({
                deleteMessageDays: days,
                reason:
                    reason +
                    ", Ban von: " +
                    interaction.user.tag +
                    " (DMDs: " +
                    days +
                    ")",
            })
            .catch((e) => {
                interaction.reply({
                    content:
                        "Ich konnte den User nicht bannen, " +
                        interaction.user.username,
                    ephemeral: true,
                });
                client.error(e, "ban.js");
                return;
            });

        client.modLog(
            `${user.user.tag} wurde von ${interaction.user.tag} wegen ${reason} gebannt.`,
            "ban.js"
        );
        await interaction.reply(
            "Der User `" +
                user.user.tag +
                "` wurde mit dem Grund `" +
                reason +
                "` gebannt."
        );
    } catch (e) {
        client.error(e, "ban.js");
    }
};
