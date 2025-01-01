// packages
import { Partials, GatewayIntentBits, Client, Routes, EmbedBuilder, AttachmentBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import Enmap from "enmap";

// native
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// functions
import log from "./functions/log.js";
import gettime from "./functions/gettime.js";

// files
import config from "./config.json" with { type: "json" };
import pck from "./package.json" with { type: "json" };

// other
const cooldownSet = new Set();

// database
const users = new Enmap({ name: "users", autoFetch: true, fetchAll: false });
const logs = new Enmap({ name: "logs", autoFetch: true, fetchAll: false });
const errors = new Enmap({ name: "errors", autoFetch: true, fetchAll: false });

// client
const client = new Client({
    partials: [Partials.Message, Partials.User, Partials.Channel],
    allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: false,
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
    ],
});

// SLASH-COMMANDS
async function slashCommands() {
    let cmds = {};
    const commands = [];

    try {
        var commandFiles = fs.readdirSync("./scommands");
    } catch (err) {
        throw err;
    }

    for (const file of commandFiles) {
        if (!file.toLowerCase().endsWith(".js")) {
            log(`Skipping: ${file}`, "green", "reset", true);
        } else {
            log(`Loading: ${file}`, "cyan", "reset", true);
            await import(`./scommands/${file}`).then((cmd) => {
                cmds[file] = cmd.default;
                commands.push(cmd.default.data.toJSON());
            });
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

            const data = await rest.put(Routes.applicationCommands(client.user.id), {
                body: commands,
            });

            log(`Loaded: ${data.length} Slash-Commands`, "blue", "reset", false);
        } catch (error) {
            client.error(error, "main.js");
        }
    }

    refresh();
}

// EVENTS
function events() {
    let events = {};

    fs.readdir(path.join(__dirname, "events"), function (err, files) {
        if (err) {
            throw err;
        }

        files.forEach(function (file) {
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

        Object.keys(events).forEach((event) => {
            log("Listening: " + event, "cyan", "reset", true);
            if (event == "ready") {
                events[event].forEach(async (file) => {
                    const eventModule = await import(`./events/${file}`);
                    eventModule.default(client);
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
                    if (await client.blacklist.includes(user.id)) return;

                    events[event].forEach(async (file) => {
                        const eventFile = await import(`./events/${file}`);
                        eventFile.default(client, ...args);
                    });
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
    log(`\nLoading: ${pck.name} v${pck.version}\n`, "red", "reset", false);

    log("Registering: Slash-Commands", "yellow", "reset", false);
    await slashCommands();

    log("\nGrouping: Events", "yellow", "reset", false);
    await events();

    log("Start complete!\n", "red", "reset", false);
});

// slash command handler
client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
        if (await client.blacklist.includes(interaction.user.id) && interaction.user.id != config.owner) {
            if (!interaction.isAutocomplete()) {
                interaction.reply({
                    content: "Du wurdest von der Benutzung von Slash-Commands ausgeschlossen.",
                    ephemeral: true, //TODO: full translation
                });
            }
            return;
        }

        // maintenance mode
        const maintenance = await JSON.parse(fs.readFileSync("./data/maintenance.json", "utf8")); // TODO: import it and see if it still works
        if (maintenance.maintenance == true && interaction.user.id != config.owner) {
            if (!interaction.isAutocomplete()) {
                interaction.reply({
                    content: "🛑 Der Bot ist aktuell gesperrt. \n Grund: `" + maintenance.reason + "`",
                    ephemeral: true,
                });
            }
            return;
        }

        // admin only
        const adminOnly = client.cmds[interaction.commandName + ".js"]?.adminOnly ? client.cmds[interaction.commandName + ".js"].adminOnly : false;
        if (adminOnly && interaction.user.id != config.owner) {
            if (!interaction.isAutocomplete()) {
                interaction.reply({
                    content: "🔒 Dieser Command ist nur für Administratoren verfügbar.",
                    ephemeral: true,
                });
            }
            return;
        }

        // cooldown
        if (interaction.user.id != config.owner && (interaction.isChatInputCommand() || interaction.isCommand())) {
            const cooldown = client.cmds[interaction.commandName + ".js"].cooldown
                ? client.cmds[interaction.commandName + ".js"].cooldown
                : config.cooldown_standard;

            // do the magic
            if (cooldownSet.has(interaction.user.id + interaction.commandName) || cooldownSet.has(interaction.user.id)) {
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

                return interaction.reply({
                    content: `⏳ \`/${interaction.commandName}\` hat einen Cooldown von \`${hDisplay + mDisplay + sDisplay}\``,
                    ephemeral: true,
                });
            }

            cooldownSet.add(interaction.user.id + interaction.commandName);
            setTimeout(() => {
                cooldownSet.delete(interaction.user.id + interaction.commandName);
            }, cooldown * 1000);
        }

        if (interaction.guild) interaction.guild.members.fetch();

        const eventFile = await import(`./events/slash-commands/${interaction.commandName}.js`);
        eventFile.default(client, interaction, interaction.locale == "de" ? "de" : "en");

        if (interaction.isAutocomplete()) return;

        const executed = new EmbedBuilder()
            .setTitle("Slash-Command")
            .setThumbnail(interaction.user.avatarURL())
            .setDescription(`\`${interaction.user.tag}\`, <@${interaction.user.id}>`)
            .addFields([
                {
                    name: "Command:",
                    value: `/\`${interaction.commandName}\``,
                    inline: true,
                },
                {
                    name: "Channel:",
                    value: "<#" + interaction.channel.id + ">",
                    inline: true,
                },
                {
                    name: "Timestamp:",
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
                        name: "Guild ID:",
                        value: `\`${interaction.guild.id}\``,
                        inline: true,
                    },
                    {
                        name: "Guild Name:",
                        value: `\`${interaction.guild.name}\``,
                        inline: true,
                    },
                    {
                        name: "Link:",
                        value: `[Link to ${interaction.user.username}'s interaction](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.id})`,
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
                        name: "User ID:",
                        value: `\`${interaction.user.id}\``,
                        inline: true,
                    },
                    {
                        name: "Username:",
                        value: `\`${interaction.user.username}\``,
                        inline: true,
                    },
                    {
                        name: "Link:",
                        value: `[Link to ${interaction.user.username}'s discord Account](https://discord.com/users/${interaction.user.id})`,
                        inline: true,
                    },
                ])
                .setFooter({
                    text: interaction.user.tag,
                    iconURL: interaction.user.avatarURL(),
                });
        }

        if (interaction.options) {
            var options = "";
            await interaction.options._hoistedOptions.forEach((option) => {
                options += `\`${option.name}\`: \`${option.value}\`\n`;
            });
        }
        // wait(1000)

        if (options) {
            executed.addFields([
                {
                    name: "Arguments:",
                    value: `${options.substring(0, 1000)}${options.toString().length > 1000 ? "\n..." : ""}`,
                    inline: false,
                },
            ]);
        }

        client.channels.cache.get(config.channels.cmdlogchannel).send({ embeds: [executed] });
    }
});

// custom log override
client.modLog = async function (message = "not provided", file = "custom") {
    const time = Date.now();
    const ID = client.log(message, file, time, true);
    const embed = new EmbedBuilder()
            .setTitle("Mod-Log")
            .setDescription(`\`\`\`${message.toString().substring(0, 2022)}\`\`\``)
            .addFields([
                {
                    name: "ID",
                    value: `\`${ID}\``,
                    inline: true,
                },
                {
                    name: "Query",
                    value: `</log list:1320738378156867645> \`${ID}\``,
                    inline: true,
                },
                {
                    name: "Origin",
                    value: `\`${file}\``,
                    inline: true,
                }
            ])
            .setFooter({
                text: gettime(true, time),
            })
            .setColor(config.colors.error);

        client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] });
};

client.log = function (message = "not provided", file = "custom", time = Date.now(), modlog = false) {
    try {
        const ID = logs.autonum;
        logs.set(ID, { timestamp: time, message: message, origin: file, modlog: modlog });
        return ID;
    } catch (e) {
        console.log(message, file);
        client.error(e, "main.js");
    }
};

// custom error override
client.error = function (message = "not provided", file = "custom") {
    try {
        const time = Date.now();
        const ID = errors.autonum;
        errors.set(ID, { timestamp: time, message: message, origin: file });

        const embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(`\`\`\`${message.toString().substring(0, 2022)}\`\`\``)
            .addFields([
                {
                    name: "ID",
                    value: `\`${ID}\``,
                    inline: true,
                },
                {
                    name: "Query",
                    value: `</error list:1320738378156867638> \`${ID}\``,
                    inline: true,
                },
                {
                    name: "Origin",
                    value: `\`${file}\``,
                    inline: true,
                }
            ])
            .setFooter({
                text: gettime(true, time),
            })
            .setColor(config.colors.error);

        client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] });
    } catch (e) {
        client.channels.cache
            .get(config.channels.modlogchannel)
            .send("Es gab einen Fehler beim Loggen eines Fehlers.\n" + e + "\n" + "Message: " + message + "\n" + "Origin: " + file);
    }
};

// databases
client.db = {};
client.db.users = users;
client.db.logs = logs;
client.db.errors = errors;

// login
client.login(config.token);

// uncaught error handling
// log("Initialising: Error handling", "yellow", "reset", false)
// process.on('uncaughtException', function(error, source) {
//     const embed = new EmbedBuilder()
//         .setTitle('Uncaught exception!')
//         .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
//         .setFooter({
//             text: `${source}`,
//             iconURL: client.user.avatarURL({ format: 'png' })
//         })
//         .setTimestamp()
//         .setColor(config.colors.error)
//         .addFields([
//             { name: "Exakte Zeit:", value: `\`${gettime()}\``, inline: true },
//         ])
//     if (error.toString().length < 1000) {
//         embed.addFields([
//             { name: "Fehler:", value: `\`${error}\``, inline: false}
//         ])
//     }
//     client.channels.cache.get(config.channels.modlogchannel).send({ embeds: [embed] })

//     if (error.toString().length > 1000) {
//         const attachment = new AttachmentBuilder(Buffer.from(`Source:\n${source}\n\n${error}`, 'utf-8'), 'error.log')
//         client.channels.cache.get(config.channels.modlogchannel).send({ files: [attachment.setName('error.log')] })
//     }
// })
// log(`Initialised: Error handling`, "red", "reset", false)
