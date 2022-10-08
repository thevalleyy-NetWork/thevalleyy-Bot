module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    const modlog = "822575095721099304";

    if (!interaction.customId.startsWith("REACTIONROLE")) return;

    const iconurl = client.guilds.cache.get("631518992342843392").iconURL();

    try {
        const botRole = interaction.message.guild.roles.cache.find(
            (role) => role.name === "BotNews"
        ).id;
        const newsRole = interaction.message.guild.roles.cache.find(
            (role) => role.name === "News"
        ).id;
        const mcRole = interaction.message.guild.roles.cache.find(
            (role) => role.name === "Minecraft"
        ).id;

        const user = await interaction.message.guild.members.fetch(
            interaction.user.id
        );

        if (interaction.customId === "REACTIONROLE_add.news") {
            user.roles.add(newsRole);
            client.channels.cache
                .get(modlog)
                .send(
                    "<@" +
                        interaction.user.id +
                        "> hat nun die News Rolle bekommen. \n Seine ID: `" +
                        interaction.user.id +
                        "`, `" +
                        interaction.user.createdAt.toLocaleString() +
                        "`"
                );
            interaction.deferUpdate();
        }

        if (interaction.customId === "REACTIONROLE_add.botNews") {
            user.roles.add(botRole);
            client.channels.cache
                .get(modlog)
                .send(
                    "<@" +
                        interaction.user.id +
                        "> hat nun die BotNews Rolle bekommen. \n Seine ID: `" +
                        interaction.user.id +
                        "`, `" +
                        interaction.user.createdAt.toLocaleString() +
                        "`"
                );
            interaction.deferUpdate();
        }

        if (interaction.customId === "REACTIONROLE_add.minecraft") {
            user.roles.add(mcRole);
            client.channels.cache
                .get(modlog)
                .send(
                    "<@" +
                        interaction.user.id +
                        "> hat nun die Minecraft Rolle bekommen. \n Seine ID: `" +
                        interaction.user.id +
                        "`, `" +
                        interaction.user.createdAt.toLocaleString() +
                        "`"
                );
            interaction.deferUpdate();
        }

        if (interaction.customId === "REACTIONROLE_remove.news") {
            user.roles.remove(newsRole);
            client.channels.cache
                .get(modlog)
                .send(
                    "<@" +
                        interaction.user.id +
                        "> wurde nun die News Rolle entzogen. \n Seine ID: `" +
                        interaction.user.id +
                        "`, `" +
                        interaction.user.createdAt.toLocaleString() +
                        "`"
                );
            interaction.deferUpdate();
        }

        if (interaction.customId === "REACTIONROLE_remove.botNews") {
            user.roles.remove(botRole);
            client.channels.cache
                .get(modlog)
                .send(
                    "<@" +
                        interaction.user.id +
                        "> wurde nun die BotNews Rolle entzogen. \n Seine ID: `" +
                        interaction.user.id +
                        "`, `" +
                        interaction.user.createdAt.toLocaleString() +
                        "`"
                );
            interaction.deferUpdate();
        }

        if (interaction.customId === "REACTIONROLE_remove.minecraft") {
            user.roles.remove(mcRole);
            client.channels.cache
                .get(modlog)
                .send(
                    "<@" +
                        interaction.user.id +
                        "> wurde nun die Minecraft Rolle entzogen. \n Seine ID: `" +
                        interaction.user.id +
                        "`, `" +
                        interaction.user.createdAt.toLocaleString() +
                        "`"
                );
            interaction.deferUpdate();
        }
    } catch (error) {
        console.log(error);
    }
};
