function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

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
    if (isJson(text)) return console.log(text)
    const styles = {
        "text": {
        "reset": "\x1b[0m",
        "bold": "\x1b[1m",
        "dim": "\x1b[2m",
        "underscore": "\x1b[4m",
        "blink": "\x1b[5m",
        "reverse": "\x1b[7m",
        "hidden": "\x1b[8m",
        "black": "\x1b[30m",
        "red": "\x1b[31m",
        "green": "\x1b[32m",
        "yellow": "\x1b[33m",
        "blue": "\x1b[34m",
        "magenta": "\x1b[35m",
        "cyan": "\x1b[36m",
        "white": "\x1b[37m",
        "crimson": "\x1b[38m"
        },
        "background": {
        "reset": "\x1b[0m",
        "black": "\x1b[40m",
        "red": "\x1b[41m",
        "green": "\x1b[42m",
        "yellow": "\x1b[43m",
        "blue": "\x1b[44m",
        "magenta": "\x1b[45m",
        "cyan": "\x1b[46m",
        "white": "\x1b[47m",
        "crimson": "\x1b[48m"
    }
    }

    if (styles.text[style.toLowerCase()]) {
        var fgColor = styles.text[style]
    } else {
        throw("Invalid text style")
    }

    if (styles.background[background.toLowerCase()]) {
        var bgColor = styles.background[background]
    } else {
        throw("Invalid background style")
    }

    console.log(`${bgColor}${showTime == true ? `[${gettime()}] » ` : ""}${fgColor}${text}${styles.text.reset}`)
}



// this function gets the current date and time ss:mm:hh:dd:MM:yyyy
function gettime() {
    var date = new Date()

    let secFiller = ""
    let minFiller = ""
    let hourFiller = ""
    let dayFiller = ""
    let monthFiller = ""

    if (date.getSeconds().toString().length < 2) secFiller = "0"
    if (date.getMinutes().toString().length < 2) minFiller = "0"
    if (date.getHours().toString().length < 2) hourFiller = "0"
    if (date.getDate().toString().length < 2) dayFiller = "0"
    if (date.getMonth().toString().length < 2) monthFiller = "0"

    var datetime =
        dayFiller + date.getDate() + "." +
        monthFiller + (date.getMonth() + 1) + ". " +
        hourFiller + date.getHours() + ":" +
        minFiller + date.getMinutes() + ":" +
        secFiller + date.getSeconds()

    return datetime
}

// start message, used for pterodactyl
log("Loading: Bot", "red", "reset", false)

// create a new client
const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')
const process = require('process')
const config = require('./config.json')


const client = new Discord.Client({
    partials: [
        Discord.Partials.Message,
        Discord.Partials.User,
        Discord.Partials.Channel
        // Discord.Partials.Reaction,
        // Discord.Partials.GuildMember,
        // Discord.Partials.GuildScheduledEvent
        // Discord.Partials.ThreadMember
    ],
    allowedMentions: {
        repliedUser: false
    },
    intents: [
        Discord.GatewayIntentBits.MessageContent,
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
        Discord.GatewayIntentBits.DirectMessageTyping

    ]
})

// start the command handler
// cmd-base
client.on('ready', async() => {
    let cmdJson = {"cmds":  {}}
    log("Registering commands", "yellow", "reset", false)


    const readCommands = dir => {
        // read the commands directory
        const files = fs.readdirSync(path.join(__dirname, dir))

        // loop through the files
        for (const file of files) {

            // check if the object is a directory 
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                // at this point we know it is a directory, so we can call the function again
                readCommands(path.join(dir, file))
            } else 
                if (!file.endsWith('.js')) { // make sure its a js file
                    log(`Skipping ${file}:`, "green", "reset", true)
                    return}
                // at this point we know it is a file, so we can require it
                log(`Loading: ${file}`, "cyan", "reset", true)
                // define option as require the file
                const option = require(path.join(__dirname, dir, file))
                cmdJson.cmds[file] = option


                // require the base file and pass the client and the option
                // commandBase(client, option)
        }
        fs.writeFileSync('./data/CMDoptions.json', JSON.stringify(cmdJson, null, 4))
    }
    // execute the defined function with dir commands
    readCommands('commands')




// load every event file
    log("Grouping: events", "yellow", "reset", false)    
    let eventJson = {"event": {}}

    fs.readdir(path.join(__dirname, 'events'), function(err, files) {
        if (err) {
            return log('[' + gettime() + '] » Error: Unable to scan directory: ' + err, "red", "reset", true)
        }
        files.forEach(function(file) {
            if (!file.endsWith('.js')) {
                log(`Skipping file ${file}`, "green", "reset", true)
                return
            }

            const eventName = file.split(".")[0]
            if (!eventJson.event[eventName]) {
                eventJson.event[eventName] = []
                log(`Grouped: ${eventName}`, "blue", "reset", true)
            }
            eventJson.event[eventName].push(file)

            log(`Scanned: ${file}`, "cyan", "reset", true)        
        })
    
    // hier coden
    log("Registering: events", "yellow", "reset", false)

        Object.keys(eventJson.event).forEach(event => {
            log("Listening: " + event, "blue", "reset", true)
            if (event == "ready") {
                eventJson.event[event].forEach(file => {
                const readyEventFile = require(`./events/${file}`)
                readyEventFile(client)
                })
                return
            }

            client.on(event, (...args) => {
                // log("Incoming Event: " + event, "blue", "reset", true)
                eventJson.event[event].forEach(file => {
                    const eventFile = require(`./events/${file}`)
                    eventFile(client, ...args)
                })
            })
        })
        log("Started: Bot", "red", "reset", false)
    })
})


// login and configuring the logchannel
client.logChannel = client.channels.cache.get('724098984100958208')
client.login(config.token)

// uncaught error handling
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