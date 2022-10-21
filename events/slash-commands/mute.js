const config = require("../../config.json");
const mysql = require("mysql2");
const util = require("util");

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});

const db = util.promisify(connection.query).bind(connection);

module.exports = (client, interaction) => {
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

    const muteUser = interaction.options.get("user");
    const reason = interaction.options.getString("reason").substring(0, 255);
    const duration = interaction.options.getString("duration");
    const muteRole = interaction.guild.roles.cache.find(
        (role) => role.name === "Muted Chat"
    ).id;

    if (muteUser.id == config.owner || muteUser.id == client.user.id)
        return interaction.reply("<:FeelsSusMan:870034696396996630>");
    if (muteUser.id == interaction.user.id)
        return interaction.reply("Sure, ~~Jan~~ " + interaction.user.username);
    if (
        muteUser.member.roles.cache.has(muteRole) ||
        Date.now() <= muteUser.member.communicationDisabledUntilTimestamp
    )
        return interaction.reply(
            "`" + muteUser.user.tag + "` ist schon gestummt."
        );

    try {
        if (duration == 0) {
            db(`UPDATE discord set muted = 1 WHERE dcid = ${muteUser.user.id}`);

            muteUser.member.roles.add(
                muteRole,
                `Mute von: ${interaction.user.tag}, Grund: ${reason}`
            );
            interaction.reply(
                "`" + muteUser.user.tag + "` kann nun nichtmehr schreiben."
            );

            client.modLog(
                `${muteUser.user.tag} wurde von ${interaction.user.tag} wegen ${reason} permanent gemuted.`,
                "mute.js"
            );

            muteUser.user
                .send(
                    "Du wurdest von `" +
                        interaction.user.tag +
                        "` auf dem Server `" +
                        interaction.guild.name +
                        `\` gemuted.\nDauer: \`Permanent\`\nGrund:\`${reason}\``
                )
                .catch((error) => {
                    client.log(error, "mute.js");
                });
        } else {
            muteUser.member.timeout(
                +duration * 60000,
                `Mute von: ${interaction.user.tag}, Grund: ${reason}`
            );
            interaction.reply(
                "`" + muteUser.user.tag + "` kann nun nichtmehr schreiben."
            );
            muteUser.user
                .send(
                    "Du wurdest von `" +
                        interaction.user.tag +
                        "` auf dem Server `" +
                        interaction.guild.name +
                        `\` gemuted.\nUnmute: <t:${
                            Math.round(Date.now() / 1000) + +duration * 60
                        }:R>\nGrund: \`${reason}\``
                )
                .catch((error) => {
                    client.log(error, "mute.js");
                });

            client.modLog(
                `${muteUser.user.tag} wurde von ${
                    interaction.user.tag
                } wegen ${reason} für ${+duration} Minuten gemuted.`,
                "mute.js"
            );
        }
    } catch (error) {
        client.error(error, "mute.js");
        interaction.reply("Es gab einen Fehler.");
    }
};
