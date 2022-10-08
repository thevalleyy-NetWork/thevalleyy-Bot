const allCommands = require("../../data/cmdlist.json");
const Discord = require("discord.js");
const config = require("../../config.json");
const fs = require("node:fs");

module.exports = async (client, interaction) => {
    if (interaction.isAutocomplete()) {
        const filtered = allCommands
            .filter((choice) =>
                choice.includes(interaction.options.getFocused().toLowerCase())
            )
            .slice(0, 25);
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
        return;
    }

    const iconurl = interaction.guild.iconURL();
    if (interaction.options._subcommand == "about") {
        const embed1 = new Discord.EmbedBuilder()
            .setColor(config.standard_color)
            .setTitle("Hilfe-Menü")
            .setTimestamp()
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL(),
            })
            .addFields([
                {
                    name: "Info",
                    value: "Hallu! Ich bins, ~~Tim~~ der Bot <:Okayge:840151989995438120>. \nFür Hilfe zu den Commands kannst du gerne ``/help command`` verwenden. \nBei Bugs bitte mir eine DM senden, danke :) \nFür mehr Infos zu mir kann ich dir ``/ping`` empfehlen. \nViel Spaß mit mir",
                    inline: true,
                },
                {
                    name: "​",
                    value: "**Mitgeholfen bei der Programmierung und Umsetzung dieses Bots haben:**",
                    inline: false,
                },
                {
                    name: "🧠 TomatoCake",
                    value: "Danke für die regelmäßigen Code-Snippets, die ich von dir geklaut habe <:PeppoHuck:845379741019668481>. Sehr sympathisch mit dir zu arbeiten",
                    inline: true,
                },
                {
                    name: "👥 Alle anderen",
                    value: "Danke an alle anderen, die mir bei der Entwicklung dieses Bots geholfen haben. \nIch hoffe, dass ihr euch auch so viel Spaß mit diesem Bot habt, wie ich ihn habe.",
                    inline: true,
                },
                {
                    name: "🖥️ Chaoshosting",
                    value: "Danke für die Bereitstellung des Servers. Ich hoffe, dass euch mein Bot gefällt.",
                    inline: true,
                },
                {
                    name: "📚 Discord.JS",
                    value: "Danke für die Bereitstellung der Library, die ich für diesen Bot nutze. \nOhne euch wäre dieser Bot nicht möglich gewesen.",
                    inline: true,
                },
                {
                    name: "🗨️ StackOverflow",
                    value: "Danke für die Bereitstellung der Community, die mir bei Problemen immer weiterhilft. \nWie ein echter Programmiere bediene ich mich dort regelmäßig an Code, und es ist sehr großartig dass es euch gibt.",
                    inline: true,
                },
            ]);
        interaction.reply({ embeds: [embed1] });
        return;
    }

    if (interaction.options._subcommand == "command") {
        const cmd = interaction.options._hoistedOptions[0].value.toString();
        const cmdjson = require(`../../data/cmdstructure.json`).cmds[
            cmd + ".js"
        ];

        const embed = new Discord.EmbedBuilder()
            .setTitle(`/${cmd}`)
            .setColor(config.standard_color);

        if (!cmdjson.data.description) {
            embed.addFields([
                {
                    name: "Beschreibung",
                    value: `\`\`\`Keine\`\`\``,
                    inline: true,
                },
            ]);
        } else {
            embed.addFields([
                {
                    name: "Beschreibung",
                    value: `\`\`\`${cmdjson.data.description.toString()}\`\`\``,
                    inline: true,
                },
            ]);
        }

        if (cmdjson.data.default_member_permissions) {
            embed.addFields([
                {
                    name: "Berechtigungen",
                    value: `\`\`\`${new Discord.PermissionsBitField(
                        cmdjson.data.default_member_permissions.toString()
                    ).toArray()}\`\`\``,
                    inline: true,
                },
            ]);
        }

        if (!cmdjson.cooldown) {
            var cooldown = config.cooldown_standard;
        } else {
            var cooldown = cmdjson.cooldown;
        }

        d = Number(cooldown);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);

        var hDisplay =
            +h > 0
                ? +h == 1
                    ? +m > 0
                        ? `eine Stunde, `
                        : +h == 1
                        ? `eine Stunde`
                        : `${h} Stunden`
                    : +m > 0
                    ? `${h} Stunden, `
                    : `${h} Stunden`
                : ``;
        var mDisplay =
            +m > 0
                ? +m == 1
                    ? +s > 0
                        ? `eine Minute, `
                        : +m == 1
                        ? `eine Minute`
                        : `${m} Minuten`
                    : +s > 0
                    ? `${m} Minuten, `
                    : `${m} Minuten`
                : ``;
        var sDisplay =
            +s > 0 ? (+s == 1 ? `eine Sekunde` : `${s} Sekunden`) : ``;

        embed.addFields([
            {
                name: "Cooldown",
                value: `\`\`\`${hDisplay + mDisplay + sDisplay}\`\`\``,
                inline: true,
            },
        ]);

        if (cmdjson.data.dm_permission == false) {
            embed.addFields([
                {
                    name: "DM-Permission",
                    value: `<:crossEmbed:1005146898451140749>`,
                    inline: true,
                },
            ]);
        } else {
            embed.addFields([
                {
                    name: "DM-Permission",
                    value: `<:checkmarkEmbed:1005146896278503597>`,
                    inline: true,
                },
            ]);
        }

        fs.stat(
            "./events/slash-commands/" + cmdjson.data.name + ".js",
            async (err, stats) => {
                if (err) {
                    console.log(err);
                    await embed.addFields([
                        {
                            name: "Filesize (code)",
                            value: `\`\`\`n/a\`\`\``,
                            inline: true,
                        },
                    ]);
                } else {
                    await embed.addFields([
                        {
                            name: "Filesize (code)",
                            value: `\`\`\`${await stats.size} bytes\`\`\``,
                            inline: true,
                        },
                    ]);
                }

                fs.stat(
                    "./scommands/" + cmdjson.data.name + ".js",
                    async (err, stats) => {
                        if (err) {
                            console.log(err);
                            await embed.addFields([
                                {
                                    name: "Filesize (builder)",
                                    value: `\`\`\`n/a\`\`\``,
                                    inline: true,
                                },
                            ]);
                        } else {
                            await embed.addFields([
                                {
                                    name: "Filesize (builder)",
                                    value: `\`\`\`${await stats.size} bytes\`\`\``,
                                    inline: true,
                                },
                            ]);
                        }

                        // i dont fucking now why i have to add the code here, it just works

                        if (cmdjson.data.options[0]) {
                            let options = "";
                            cmdjson.data.options.map((option) => {
                                options +=
                                    `${option.name}: ` +
                                    `\n\tBeschreibung: ${option.description} ` +
                                    `\n\tTyp: ${option.type
                                        .toString()
                                        .replace("11", "Anhang")
                                        .replace("10", "Nummer")
                                        .replace("9", "Rolle oder Benutzer")
                                        .replace("8", "Rolle")
                                        .replace("7", "Kanal")
                                        .replace("6", "Benutzer")
                                        .replace("5", "Boolescher Wert")
                                        .replace("4", "Integer")
                                        .replace("3", "Zeichenfolge")
                                        .replace("2", "SubcommandGroup")
                                        .replace("1", "Subcommand")} ` +
                                    `\n\tErforderlich: ${
                                        option.required ? "Ja" : "Nein"
                                    } ` +
                                    `${
                                        option.choices
                                            ? "\n\tAuswahlmöglichkeiten: Ja"
                                            : ""
                                    } ` +
                                    `${
                                        option.autocomplete
                                            ? "\n\tAutocomplete: Ja"
                                            : ""
                                    } \n\n`;
                            });

                            embed.addFields([
                                {
                                    name:
                                        cmdjson.data.options.length > 1
                                            ? "Argumente"
                                            : "Argument",
                                    value: `\`\`\`${options}\`\`\``,
                                },
                            ]);
                        } else {
                            embed.addFields([
                                {
                                    name: "Argumente",
                                    value: "```Keine```",
                                    inline: true,
                                },
                            ]);
                        }

                        embed
                            .setFooter({
                                text: interaction.guild.name,
                                iconURL: iconurl,
                            })
                            .setTimestamp();

                        interaction.reply({ embeds: [embed] });
                    }
                );
            }
        );
    }
    return;
};
