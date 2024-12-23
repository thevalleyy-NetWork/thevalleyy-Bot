// --define and create some things--
// packages
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const package = require("./package.json");

// native
const path = require("path");
const fs = require("node:fs");
const { get } = require("http");
const wait = require("node:timers/promises").setTimeout;

// functions
const log = require("./functions/log.js");
const gettime = require("./functions/gettime.js");

// files
const config = require("./config.json");

// other
const cooldownSet = new Set();

// database
// TODO: lowdb

// client
const client = new Discord.Client({
    partials: [
        Discord.Partials.Message,
        Discord.Partials.User,
        Discord.Partials.Channel,
        // Discord.Partials.Reaction,
        // Discord.Partials.GuildMember,
        // Discord.Partials.GuildScheduledEvent
        // Discord.Partials.ThreadMember
    ],
    allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: false,
    },
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.DirectMessageReactions,
    ],
});

// SLASH-COMMANDS
function slashCommands() {
    let cmds = {};
    const commands = [];

    try {
        var commandFiles = fs.readdirSync("./scommands");
    } catch (err) {
        return log("[" + gettime() + "] » Error: Unable to scan directory: " + err, "red", "reset", true);
    }

    for (const file of commandFiles) {
        if (!file.toLowerCase().endsWith(".js")) {
            log(`Skipping: ${file}`, "green", "reset", true);
        } else {
            cmds[file] = require(`./scommands/${file}`);
            const command = require(`./scommands/${file}`);
            commands.push(command.data.toJSON());
            log(`Loading: ${file}`, "cyan", "reset", true);
        }
    }

    client.cmds = cmds;

    const rest = new REST({ version: "10" }).setToken(config.token);

    async function refresh() {
        try {
            log(
                "Refreshing: " + commandFiles.filter((file) => file.toLowerCase().endsWith(".js")).length + " Slash-Commands\n",
                "cyan",
                "reset",
                true
            );

            const data = await rest.put(Discord.Routes.applicationCommands(client.user.id), {
                body: commands,
            });

            log(`Loaded: ${data.length} Slash-Commands`, "blue", "reset", false);
            log("Start complete!\n", "red", "reset", false);
        } catch (error) {
            client.error(error, "main.js");
        }
    }

    refresh();
}

// EVENTS
function events() {
    let events = {};

    fs.readdir(path.join(__dirname, "events"), async function (err, files) {
        if (err) {
            return log("[" + gettime() + "] » Error: Unable to scan directory: " + err, "red", "reset", true);
        }
        await files.forEach(function (file) {
            if (!file.toLowerCase().endsWith(".js")) {
                log(`Skipping: ${file}`, "green", "reset", true);
                return;
            }

            const eventName = file.split(".")[0];
            if (!events[eventName]) {
                events[eventName] = [];
                log(`Grouping: ${eventName}`, "cyan", "reset", true);
            }
            events[eventName].push(file);

            log(`\t${file}`, "cyan", "reset", true);
        });

        client.events = events;
        log("\nRegistering: Events", "yellow", "reset", false);

        await Object.keys(events).forEach((event) => {
            log("Listening: " + event, "cyan", "reset", true);
            if (event == "ready") {
                events[event].forEach((file) => {
                    require(`./events/${file}`)(client);
                });
                return;
            }

            client.on(event, async (...args) => {
                try {
                    if (event == "messageCreate") var user = args[0].author;
                    else if (event == "interactionCreate") var user = args[0].user;
                    else if (event == "voiceStateUpdate") var user = args[0].member.user;
                    else if (event.startsWith("guildMember")) var user = args[0].user;

                    if (user.bot) return;

                    // is user blacklisted?
                    if (await client.blacklist.includes(user.id)) {
                    } else {
                        const maintenance = await JSON.parse(fs.readFileSync("./data/maintenance.json", "utf8"));

                        if (maintenance.maintenance == true && user.id != config.owner) {
                            if (event == "interactionCreate" && !args[0].isAutocomplete() && !args[0].isChatInputCommand()) {
                                console.log(event, args[0], user);
                                args[0].reply({
                                    content: "🛑 Der Bot ist aktuell gesperrt. \n Grund: `" + maintenance.reason + "`",
                                    ephemeral: true,
                                });
                            }
                            return;
                        }

                        events[event].forEach((file) => {
                            const eventFile = require(`./events/${file}`);
                            eventFile(client, ...args);
                        });
                    }
                } catch (error) {
                    client.error(error, "main.js");
                }
            });
        });

        log(`\nLoaded: ${files.filter((file) => file.toLowerCase().endsWith(".js")).length} Events`, "blue", "reset", false);
    });
}

// start all handlers
client.on("ready", async () => {
    log(`\nLoading: ${package.name} v${package.version}\n`, "red", "reset", false);

    log("Registering: Slash-Commands", "yellow", "reset", false);
    await slashCommands();

    log("\nGrouping: Events", "yellow", "reset", false);
    await events();
});

// slash command handler
client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
        if (await client.blacklist.includes(interaction.user.id)) {
        } else {
            const maintenance = await JSON.parse(fs.readFileSync("./data/maintenance.json", "utf8"));

            if (maintenance.maintenance == true && interaction.user.id != config.owner) {
                if (!interaction.isAutocomplete()) {
                    interaction.reply({
                        content: "🛑 Der Bot ist aktuell gesperrt. \n Grund: `" + maintenance.reason + "`",
                        ephemeral: true,
                    });
                }
                return;
            }

            // cooldown
            if (interaction.user.id != config.owner && interaction.isChatInputCommand()) {
                const cooldown = client.cmdStructure.cmds[interaction.commandName + ".js"].cooldown;

                if (cooldown == undefined) {
                    // No custom cooldown, use the default

                    // react and remove the message
                    if (cooldownSet.has(interaction.user.id))
                        return interaction.reply({
                            content: `⏳ \`/${interaction.commandName}\` hat einen Cooldown von \`${config.cooldown_standard}\` Sekunden.`,
                            ephemeral: true,
                        });

                    // add the user to the cooldown set
                    cooldownSet.add(interaction.user.id);
                    setTimeout(() => {
                        cooldownSet.delete(interaction.user.id);
                    }, config.cooldown_standard * 1000);
                } else {
                    // the same as above, but with a custom cooldown
                    // calculate the cooldown
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
                    var sDisplay = +s > 0 ? (+s == 1 ? `eine Sekunde` : `${s} Sekunden`) : ``;

                    // do the magic
                    if (cooldownSet.has(interaction.user.id + interaction.commandName) || cooldownSet.has(interaction.user.id))
                        return interaction.reply({
                            content: `⏳ \`/${interaction.commandName}\` hat einen Cooldown von \`${hDisplay + mDisplay + sDisplay}\``,
                            ephemeral: true,
                        });
                    cooldownSet.add(interaction.user.id + interaction.commandName);
                    setTimeout(() => {
                        cooldownSet.delete(interaction.user.id + interaction.commandName);
                    }, cooldown * 1000);
                }
            }

            if (interaction.guild) interaction.guild.members.fetch();

            const eventFile = require(`./events/slash-commands/${interaction.commandName}.js`);
            eventFile(client, interaction);

            if (interaction.isAutocomplete()) return;

            const executed = new Discord.EmbedBuilder()
                .setTitle("registered a slash-command")
                .setThumbnail(interaction.user.avatarURL())
                .setDescription(`\`${interaction.user.tag}\`, <@${interaction.user.id}>`)
                .addFields([
                    {
                        name: "command:",
                        value: `/\`${interaction.commandName}\``,
                        inline: true,
                    },
                    {
                        name: "channel:",
                        value: "<#" + interaction.channel.id + ">",
                        inline: true,
                    },
                    {
                        name: "timestamp:",
                        value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F> (${Math.round(interaction.createdTimestamp / 1000)})`,
                        inline: true,
                    },
                ])
                .setTimestamp()
                .setColor(config.colors.default);
            if (interaction.guild) {
                executed
                    .addFields([
                        {
                            name: "guild.id:",
                            value: `\`${interaction.guild.id}\``,
                            inline: true,
                        },
                        {
                            name: "guild.name:",
                            value: `\`${interaction.guild.name}\``,
                            inline: true,
                        },
                        {
                            name: "link:",
                            value: `[https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.id}](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.id} "link to ${interaction.user.username}'s interaction")`,
                            inline: true,
                        },
                    ])
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: interaction.guild.iconURL(),
                    });
            } else {
                executed
                    .addFields([
                        {
                            name: "user.id:",
                            value: `\`${interaction.user.id}\``,
                            inline: true,
                        },
                        {
                            name: "user.name:",
                            value: `\`${interaction.user.username}\``,
                            inline: true,
                        },
                        {
                            name: "link:",
                            value: `[https://discord.com/users/${interaction.user.id}](https://discord.com/users/${interaction.user.id} "link to ${interaction.user.username}'s discord account")`,
                            inline: true,
                        },
                    ])
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.avatarURL(),
                    });
            }

            if (interaction.options) {
                options = "";
                await interaction.options._hoistedOptions.forEach((option) => {
                    options += `\`${option.name}\`: \`${option.value}\`\n`;
                });
            }
            // wait(1000)

            if (!options) options = "n/a";
            executed.addFields([
                {
                    name: "arguments:",
                    value: `${options.substring(0, 1000)}${options.toString().length > 1000 ? "\n..." : ""}`,
                    inline: false,
                },
            ]);
            // if (interaction.isChatInputCommand()) {
            client.channels.cache.get(config.channels.cmdlogchannel).send({ embeds: [executed] });
            // }
        }
    } else return;
});

// custom log override
client.modLog = async function (message, file = "custom") {
    const time = Date.now();
    const embed = new Discord.EmbedBuilder()
        .setTitle("Mod-Log")
        .setDescription(`\`\`\`${message.toString().substring(0, 2022)}\`\`\``)
        .setFooter({ text: "origin: " + file + " | " + gettime(true, time) })
        .setColor(config.colors.info);

    // await wait(1000); // wait 1 second to prevent wrong ids
    // TODO: log modlog

    // embed.addFields([
    //     { name: "log-id", value: `\`${res[0].id + 1}\``, inline: true },
    //     {
    //         name: "sql-query",
    //         value: `\`\`\`sql\nSELECT * FROM logs WHERE id = ${res[0].id + 1}\`\`\``,
    //         inline: false,
    //     },
    // ]);

    client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] });

    // client.log(message, file, time, 1);
};

client.log = async function (message, file = "custom", time = Date.now(), modlog = 0) {
    //TODO log to database
    // try {
    //     await db("INSERT INTO logs (message, origin, time, modlog) VALUES (?, ?, ?, ?)", [
    //         encodeURI(message),
    //         encodeURI(file),
    //         time,
    //         modlog.toString(),
    //     ]);
    // } catch (e) {
    //     client.channels.cache.get(config.mod_log_channel_id).send("Es gab einen Fehler beim Loggen.\n" + e);
    // }
};

// custom error override
client.error = async function (message, file = "custom") {
    try {
        const time = Date.now();
        // await db("INSERT INTO errors (message, origin, time) VALUES (?, ?, ?)", [encodeURI(message), encodeURI(file), time]);

        const embed = new Discord.EmbedBuilder()
            .setTitle("Error")
            .setDescription(`\`\`\`${message.toString().substring(0, 2022)}\`\`\``)
            .setFooter({
                text: "origin: " + file + " | " + gettime(true, time),
            })
            .setColor(config.colors.error);

        // TODO: log error

        // const res = await db("SELECT id FROM errors ORDER BY id desc LIMIT 1");
        // if (res.length == 0) {
        //     client.channels.cache
        //         .get(config.mod_log_channel_id)
        //         .send("Es gab einen Fehler beim Loggen des Fehlers. Es wurde kein Eintrag in der Errors Datenbank gefunden.");
        //     return;
        // }

        // embed.addFields([
        //     { name: "error-id", value: `\`${res[0].id}\``, inline: true },
        //     {
        //         name: "sql-query",
        //         value: `\`\`\`sql\nSELECT * FROM errors WHERE id = ${res[0].id}\`\`\``,
        //         inline: false,
        //     },
        // ]);

        client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] });
    } catch (e) {
        client.channels.cache
            .get(config.channels.modlogchannel)
            .send("Es gab einen Fehler beim Loggen eines Fehlers.\n" + e + "\n" + "Message: " + message + "\n" + "Origin: " + file);
    }
};

client.login(config.token);

// uncaught error handling
// log("Initialising: error-handling", "yellow", "reset", false)
// process.on('uncaughtException', function(error, source) {
//     const embedfail = new Discord.EmbedBuilder()
//         .setTitle('Es gab einen Fehler!')
//         .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
//         .setFooter({
//             text: `${source}`,
//             iconURL: client.user.avatarURL({ format: 'png' })
//         })
//         .setTimestamp()
//         .setColor(config.mod_log_color_error)
//         .addFields([
//             { name: "Exakte Zeit:", value: `\`${gettime()}\``, inline: true },
//         ])
//     if (error.toString().length < 1000) {
//         embedfail.addFields([
//             { name: "Fehler:", value: `\`${error}\``, inline: false}
//         ])
//         } else {
//         embedfail.addFields([
//             { name: "Fehler:", value: "Der Fehler ist zu lang, um hier dargestellt zu werden.", inline: true}
//         ])

//         const attachment = new Discord.AttachmentBuilder(Buffer.from(`Source:\n${source}\n\n${error}`, 'utf-8'), 'error.log')
//         client.channels.cache.get(config.mod_log_channel_id).send({ files: [attachment] })
//     }
//     client.channels.cache.get(config.mod_log_channel_id).send({ embeds: [embedfail] })
// })
// log(`Initialised: Error-Handling`, "red", "reset", false)
