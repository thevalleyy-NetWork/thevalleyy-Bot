const Discord = require("discord.js");
const config = require("../../config.json");
const mysql = require("mysql2");
const util = require("util");
const paginationEmbed = require("../../functions/pagination.js");
const getTime = require("../../functions/gettime.js");

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});

const db = util.promisify(connection.query).bind(connection);

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.id !== config.owner) return;

    if (interaction.options._subcommand == "list") {
        const button1 = new Discord.ButtonBuilder()
            .setCustomId("previousbtn")
            .setLabel("◀️")
            .setStyle("Secondary");

        const button2 = new Discord.ButtonBuilder()
            .setCustomId("nextbtn")
            .setLabel("▶️")
            .setStyle("Secondary");

        buttonList = [button1, button2];

        if (!interaction.options.getNumber("amount")) {
            var amount = 10;
        } else {
            var amount = interaction.options.getNumber("amount");
        }

        if (amount < 1 || amount > 100)
            return interaction.reply({
                content: "Die Anzahl muss zwischen 1 und 100 liegen.",
                ephemeral: true,
            });

        // request n errors at db
        try {
            const errors = await db(
                "SELECT * FROM errors ORDER BY id DESC LIMIT ?",
                amount
            );
            if (errors.length == 0)
                return interaction.reply("Es wurden keine Errors gefunden.");
            // proceed if there are errors
            const pages = [];
            for (let i = 0; i < errors.length; i++) {
                const error = errors[i];
                const embed = new Discord.EmbedBuilder()
                    .setColor(config.standard_color)
                    .setTitle(`Error #${error.id}`)
                    .setDescription(`\`\`\`\n${decodeURI(error.message)}\`\`\``)
                    .addFields([
                        {
                            name: "Origin",
                            value: decodeURI(error.origin),
                            inline: true,
                        },
                        {
                            name: "Timestamp",
                            value: `\`\`\`\n${getTime(
                                true,
                                error.time
                            )}\`\`\` (<t:${Math.round(error.time / 1000)}:R>)`,
                        },
                    ]);
                pages.push(embed);
            }

            paginationEmbed(interaction, pages, buttonList, 120000);
        } catch (err) {
            client.error(err, "error.js");
            interaction.reply({
                content: "Es ist ein Fehler aufgetreten.",
                ephemeral: true,
            });
            return;
        }

        return;
    }

    // code für insert
    const message = interaction.options.getString("message");
    const origin = interaction.options.getString("origin");

    client.error(message, origin ? origin : "custom");
    interaction.reply("Error wird erstellt...");
};
