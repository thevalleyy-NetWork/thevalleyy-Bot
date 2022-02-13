console.log('\n')
console.log('\n--------------------------- \n    Starte Talis Bot...   \n--------------------------- \n')
setTimeout(() => console.log('\n--------------------------- \n  Talis Bot ist gestartet   \n--------------------------- \n'), 4000)

const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const client = new Discord.Client({
    partials: [
        "MESSAGE",
        // "REACTION",
        // "GUILD_MEMBER",
        "USER",
        "CHANNEL"
    ],
    allowedMentions: {
        repliedUser: false
    },
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING

    ]
})

//cmd-base
client.on('ready', async () => {
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)
    var directoryPath = path.join(__dirname, 'content')

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

    console.log(`[${datetime}] » Registering commands`)
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
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

            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            console.log(`[${datetime}] » Loading: ${file}`)
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }
    readCommands('commands')

    console.log(`[${datetime}] » Registering: content`)
    fs.readdir(directoryPath, function(err, files) {
        if (err) {
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

            return console.log('[' + datetime + '] » Error: Unable to scan directory: ' + err)
        }
        files.forEach(function(file) {
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

            require('./content/' + file)(client)
            console.log(`[${datetime}] » Loading: ${file}`)
        })
    })
})


// require('./content/startup.js')(client)
client.logChannel = client.channels.cache.get('724098984100958208')
client.login(config.token)