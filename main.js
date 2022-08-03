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
console.log('\n\n--------------------------- \n    Starte Talis Bot...   \n--------------------------- \n')

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
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)
    var directoryPath = path.join(__dirname, 'events')


    console.log(`[${gettime()}] » Registering commands`)
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                if (!file.endsWith('.js')) {
                    console.log(`[${gettime()}] » Skipping file ${file}`)
                    return
                }
                console.log(`[${gettime()}] » Loading: ${file}`)
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }
    readCommands('commands')

// load every event file
    console.log(`[${gettime()}] » Registering: events`)
    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            return console.log('[' + gettime() + '] » Error: Unable to scan directory: ' + err)
        }
        files.forEach(function(file) {
            if (!file.endsWith('.js')) {
                console.log(`[${gettime()}] » Skipping file ${file}`)
                return
            }
            require('./events/' + file)(client)
            console.log(`[${gettime()}] » Loading: ${file}`)
        })
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
//             iconURL: client.user.avatarURL({ format: 'png', dynamic: true })
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