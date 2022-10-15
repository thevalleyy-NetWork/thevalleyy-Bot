const Discord = require("discord.js");
const path = require("path");
const fs = require("node:fs");
const process = require("process");
const config = require("./config.json");
const cmdJson = require("./data/cmdstructure.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { token } = require("./config.json");
const cooldownSet = new Set();
const mysql = require("mysql2");
const util = require("util");
const { get } = require("http");
const wait = require("node:timers/promises").setTimeout;

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});

var db = util.promisify(connection.query).bind(connection);

function isJson(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

function log(text, style = "reset", background = "reset", showTime = true) {
    if (isJson(text)) return console.log(text);
    const styles = {
        text: {
            reset: "\x1b[0m",
            bold: "\x1b[1m",
            dim: "\x1b[2m",
            underscore: "\x1b[4m",
            blink: "\x1b[5m",
            reverse: "\x1b[7m",
            hidden: "\x1b[8m",
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
            crimson: "\x1b[38m",
        },
        background: {
            reset: "\x1b[0m",
            black: "\x1b[40m",
            red: "\x1b[41m",
            green: "\x1b[42m",
            yellow: "\x1b[43m",
            blue: "\x1b[44m",
            magenta: "\x1b[45m",
            cyan: "\x1b[46m",
            white: "\x1b[47m",
            crimson: "\x1b[48m",
        },
    };

    if (styles.text[style.toLowerCase()]) {
        var fgColor = styles.text[style];
    } else {
        throw "Invalid text style";
    }

    if (styles.background[background.toLowerCase()]) {
        var bgColor = styles.background[background];
    } else {
        throw "Invalid background style";
    }

    console.log(
        `${bgColor}${
            showTime == true ? `[${gettime()}] » ` : ""
        }${fgColor}${text}${styles.text.reset}`
    );
}

function gettime(full = false) {
    function addZero(x, n) {
        while (x.toString().length < n) {
            x = "0" + x;
        }
        return x;
    }

    const d = new Date();
    let y = d.getFullYear();
    let mm = addZero(d.getMonth() + 1, 2);
    let dd = addZero(d.getDate(), 2);
    let h = addZero(d.getHours(), 2);
    let m = addZero(d.getMinutes(), 2);
    let s = addZero(d.getSeconds(), 2);
    let ms = addZero(d.getMilliseconds(), 3);
    if (full) {
        return `${dd}.${mm}.${y} ${h}:${m}:${s}:${ms}`;
    } else {
        return `${dd}.${mm}. ${h}:${m}:${s}`;
    }
}

log(
    `\nLoading: ${require("./package.json").name} v${
        require("./package.json").version
    }\n`,
    "red",
    "reset",
    false
);

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
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMessageTyping,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
    ],
});

// MESSAGE-COMMANDS
function messageCommands() {
    let cmdJson = { cmds: {} };
    log("Registering: Message-Commands", "yellow", "reset", false);

    const readCommands = (dir) => {
        // read the commands directory
        const files = fs.readdirSync(path.join(__dirname, dir));

        // loop through the files
        for (const file of files) {
            // check if the object is a directory
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                // at this point we know it is a directory, so we can call the function again
                readCommands(path.join(dir, file));
            } else if (!file.toLowerCase().endsWith(".js")) {
                // make sure its a js file
                log(`Skipping: ${file}`, "green", "reset", true);
                return;
            }
            // at this point we know it is a file, so we can require it
            log(`Loading: ${file}`, "cyan", "reset", true);
            // define option as require the file
            const option = require(path.join(__dirname, dir, file));
            cmdJson.cmds[file] = option;
        }
        fs.writeFileSync(
            "./data/CMDoptions.json",
            JSON.stringify(cmdJson, null, 4)
        );
        log(
            `Loaded: ${
                files.filter((file) => file.toLowerCase().endsWith(".js"))
                    .length
            } Message-Commands\n`,
            "blue",
            "reset",
            false
        );
    };
    // execute the defined function with dir commands
    readCommands("commands");
}

// SLASH-COMMANDS
function slashCommands() {
    let cmdJson = { cmds: {} };
    // load every slash command
    log("Registering: Slash-Commands", "yellow", "reset", false);
    const commands = [];
    try {
        var commandFiles = fs.readdirSync("./scommands");
    } catch (err) {
        return log(
            "[" + gettime() + "] » Error: Unable to scan directory: " + err,
            "red",
            "reset",
            true
        );
    }

    // Place your client and guild ids here
    const clientId = client.user.id;

    for (const file of commandFiles) {
        if (!file.toLowerCase().endsWith(".js")) {
            log(`Skipping: ${file}`, "green", "reset", true);
        } else {
            cmdJson.cmds[file] = require(`./scommands/${file}`);
            const command = require(`./scommands/${file}`);
            commands.push(command.data.toJSON());
            log(`Loading: ${file}`, "cyan", "reset", true);
        }
    }
    fs.writeFileSync(
        "./data/cmdstructure.json",
        JSON.stringify(cmdJson, null, 4)
    );

    const rest = new REST({ version: "10" }).setToken(token);

    async function refresh() {
        try {
            log(
                "Refreshing: " +
                    commandFiles.filter((file) =>
                        file.toLowerCase().endsWith(".js")
                    ).length +
                    " Slash-Commands\n",
                "cyan",
                "reset",
                true
            );

            const data = await rest.put(Routes.applicationCommands(clientId), {
                body: commands,
            });

            log(
                `Loaded: ${data.length} Slash-Commands\n`,
                "blue",
                "reset",
                false
            );

            log("Started: Bot", "red", "reset", false);
        } catch (error) {
            client.error(error, "main.js");
        }
    }

    refresh();
}

// EVENTS
function events() {
    log("\nGrouping: Events", "yellow", "reset", false);
    let eventJson = { event: {} };

    fs.readdir(path.join(__dirname, "events"), function (err, files) {
        if (err) {
            return log(
                "[" + gettime() + "] » Error: Unable to scan directory: " + err,
                "red",
                "reset",
                true
            );
        }
        files.forEach(function (file) {
            const stat = fs.lstatSync(path.join(__dirname, "events", file));

            if (!file.toLowerCase().endsWith(".js")) {
                log(`Skipping: ${file}`, "green", "reset", true);
                return;
            }

            const eventName = file.split(".")[0];
            if (!eventJson.event[eventName]) {
                eventJson.event[eventName] = [];
                log(`Grouping: ${eventName}`, "cyan", "reset", true);
            }
            eventJson.event[eventName].push(file);

            log(`Scanned: ${file}`, "cyan", "reset", true);
        });

        log("\nRegistering: Events", "yellow", "reset", false);

        Object.keys(eventJson.event).forEach((event) => {
            log("Listening: " + event, "cyan", "reset", true);
            if (event == "ready") {
                eventJson.event[event].forEach((file) => {
                    require(`./events/${file}`)(client);
                });
                return;
            }

            client.on(event, async (...args) => {
                // blacklist
                if (event == "messageCreate") {
                    try {
                        if (args[0].author.bot) return;
                        const maintenance = await JSON.parse(
                            fs.readFileSync("./data/maintenance.json", "utf8")
                        );
                        if (
                            maintenance.maintenance == true &&
                            args[0].author.id != config.owner
                        )
                            return;

                        if (args[0].author.id != config.owner) {
                            if (
                                await db(
                                    `SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${args[0].author.id}`
                                ).then((res) => res[0])
                            )
                                return;
                        }
                    } catch (e) {
                        client.error(e, "main.js");
                    }
                }

                if (event == "guildMemberAdd" || event == "guildMemberRemove") {
                    try {
                        if (args[0].user.id != config.owner) {
                            if (
                                await db(
                                    `SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${args[0].user.id}`
                                ).then((res) => res[0])
                            )
                                return;
                        }
                    } catch (e) {
                        client.error(e, "main.js");
                    }
                }

                if (event == "guildMemberUpdate") {
                    try {
                        if (args[0].user.id != config.owner) {
                            if (
                                await db(
                                    `SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${args[0].user.id}`
                                ).then((res) => res[0])
                            )
                                return;
                        }
                    } catch (e) {
                        client.error(e, "main.js");
                    }
                }

                if (event == "interactionCreate") {
                    try {
                        if (args[0].user.bot) return;
                        const maintenance = await JSON.parse(
                            fs.readFileSync("./data/maintenance.json", "utf8")
                        );
                        if (
                            maintenance.maintenance == true &&
                            args[0].user.id != config.owner
                        )
                            return args[0].reply({
                                content:
                                    (await "🛑 Der Bot ist aktuell gesperrt. \n Grund: `") +
                                    maintenance.reason +
                                    "`",
                                ephemeral: true,
                            });

                        if (args[0].user.id != config.owner) {
                            if (
                                await db(
                                    `SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${args[0].user.id}`
                                ).then((res) => res[0])
                            )
                                return;
                        }
                    } catch (e) {
                        client.error(e, "main.js");
                    }
                }

                if (event == "voiceStateUpdate") {
                    try {
                        if (args[0].member.user.id != config.owner) {
                            if (
                                await db(
                                    `SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${args[0].member.user.id}`
                                ).then((res) => res[0])
                            )
                                return;
                        }
                    } catch (e) {
                        client.error(e, "main.js");
                    }
                }

                // log("Incoming Event: " + event, "blue", "reset", true)
                eventJson.event[event].forEach((file) => {
                    const eventFile = require(`./events/${file}`);
                    eventFile(client, ...args);
                });
            });
        });
        log(
            `Loaded: ${
                files.filter((file) => file.toLowerCase().endsWith(".js"))
                    .length
            } Events\n`,
            "blue",
            "reset",
            false
        );
    });
}

// start all handlers
client.on("ready", async () => {
    // messageCommands()
    slashCommands();
    events();
});

// slash command handler
client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
        // blacklist
        try {
            if (interaction.user.id != config.owner) {
                if (
                    await db(
                        `SELECT dcid FROM discord WHERE blacklisted = 1 AND dcid = ${interaction.user.id}`
                    ).then((res) => res[0])
                )
                    return;
            }
        } catch (e) {
            v;
        }

        const maintenance = await JSON.parse(
            fs.readFileSync("./data/maintenance.json", "utf8")
        );
        if (
            maintenance.maintenance == true &&
            interaction.user.id != config.owner
        )
            return interaction.reply({
                content:
                    (await "🛑 Der Bot ist aktuell gesperrt. \n Grund: `") +
                    maintenance.reason +
                    "`",
                ephemeral: true,
            });

        // cooldown
        if (interaction.user.id != config.owner) {
            const cooldown =
                cmdJson.cmds[interaction.commandName + ".js"].cooldown;

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
                var sDisplay =
                    +s > 0 ? (+s == 1 ? `eine Sekunde` : `${s} Sekunden`) : ``;

                // do the magic
                if (
                    cooldownSet.has(
                        interaction.user.id + interaction.commandName
                    ) ||
                    cooldownSet.has(interaction.user.id)
                )
                    return interaction.reply({
                        content: `⏳ \`/${
                            interaction.commandName
                        }\` hat einen Cooldown von \`${
                            hDisplay + mDisplay + sDisplay
                        }\``,
                        ephemeral: true,
                    });
                cooldownSet.add(interaction.user.id + interaction.commandName);
                setTimeout(() => {
                    cooldownSet.delete(
                        interaction.user.id + interaction.commandName
                    );
                }, cooldown * 1000);
            }
        }

        if (interaction.guild) interaction.guild.members.fetch();

        const eventFile = require(`./events/slash-commands/${interaction.commandName}.js`);
        eventFile(client, interaction);

        const executed = new Discord.EmbedBuilder()
            .setTitle("registered a slash-command")
            .setThumbnail(interaction.user.avatarURL())
            .setDescription(
                `\`${interaction.user.tag}\`, <@${interaction.user.id}>`
            )
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
                    value: `<t:${Math.round(
                        interaction.createdTimestamp / 1000
                    )}:F> (${Math.round(interaction.createdTimestamp / 1000)})`,
                    inline: true,
                },
            ])
            .setTimestamp()
            .setColor(config.cmd_log_color);
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
                value: `${options.substring(0, 1000)}${
                    options.toString().length > 1000 ? "\n..." : ""
                }`,
                inline: false,
            },
        ]);
        client.channels.cache
            .get(config.cmd_log_channel_id)
            .send({ embeds: [executed] });
    } else return;
});

// custom log override
client.modLog = async function (message, file = "custom") {
    const time = gettime(true);
    const embed0 = new Discord.EmbedBuilder()
        .setTitle("mod-log")
        .setDescription(`\`\`\`${message.toString().substring(0, 2022)}\`\`\``)
        .setFooter({ text: "origin: " + file + " | " + time })
        .setColor(config.mod_log_color);

    const res = await db("SELECT id FROM logs ORDER BY id desc LIMIT 1");
    if (res.length == 0) {
        client.channels.cache
            .get(config.mod_log_channel_id)
            .send("Es gab einen Fehler beim Loggen.");
        return;
    }

    embed0.addFields([
        { name: "log-id", value: `\`${res[0].id + 1}\``, inline: true },
        {
            name: "sql-query",
            value: `\`\`\`sql\nSELECT * FROM logs WHERE id = ${
                res[0].id + 1
            }\`\`\``,
            inline: false,
        },
    ]);

    client.channels.cache
        .get(config.mod_log_channel_id)
        .send({ embeds: [embed0] });

    client.log(message, file, time, 1);
};

client.log = async function (
    message,
    file = "custom",
    time = gettime(true),
    modlog = 0
) {
    try {
        await db(
            "INSERT INTO logs (message, origin, time, modlog) VALUES (?, ?, ?, ?)",
            [message, file, time, modlog]
        );
    } catch (e) {
        client.channels.cache
            .get(config.mod_log_channel_id)
            .send("Es gab einen Fehler beim Loggen.\n" + e);
    }
};

// custom error override
client.error = async function (message, file = "custom") {
    try {
        const time = gettime(true);
        await db(
            "INSERT INTO errors (message, origin, time) VALUES (?, ?, ?)",
            [message, file, time]
        );

        const embed1 = new Discord.EmbedBuilder()
            .setTitle("error")
            .setDescription(
                `\`\`\`${message.toString().substring(0, 2022)}\`\`\``
            )
            .setFooter({ text: "origin: " + file + " | " + time })
            .setColor(config.mod_log_color_error);

        const res = await db("SELECT id FROM errors ORDER BY id desc LIMIT 1");
        if (res.length == 0) {
            client.channels.cache
                .get(config.mod_log_channel_id)
                .send("Es gab einen Fehler beim Loggen des Fehlers. lol");
            return;
        }

        embed1.addFields([
            { name: "error-id", value: `\`${res[0].id}\``, inline: true },
            {
                name: "sql-query",
                value: `\`\`\`sql\nSELECT * FROM errors WHERE id = ${res[0].id}\`\`\``,
                inline: false,
            },
        ]);

        client.channels.cache
            .get(config.mod_log_channel_id)
            .send({ embeds: [embed1] });
    } catch (e) {
        client.channels.cache
            .get(config.mod_log_channel_id)
            .send(
                "Es gab einen Fehler beim Loggen eines Fehlers.\n" +
                    e +
                    "\n" +
                    "Message: " +
                    message +
                    "\n" +
                    "Origin: " +
                    file
            );
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
