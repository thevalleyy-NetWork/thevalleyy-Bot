// function to find the given member
function getMember(message, toFind = '') {
    toFind = toFind.toLowerCase()
    let target = message.guild.members.cache.get(toFind)

    if (!target && message.mentions.members)
        target = message.mentions.members.first()

    if (!target && toFind) {
        target = message.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind)
        })
    }

    if (!target) return
    return target
}

// function to calculate the duration of a song in hh:mm:ss format
function getDuration(start, end) {
    const date = new Date(end - start)

    let secFiller = ""
    let minFiller = ""
    let hourFiller = ""

    if (date.getSeconds().toString().length < 2) secFiller = "0"
    if (date.getMinutes().toString().length < 2) minFiller = "0"
    if (date.getHours().toString().length - 1 < 2) hourFiller = "0"

    var dura = `${hourFiller}${date.getHours() + date.getTimezoneOffset() / 60}:${minFiller}${date.getMinutes()}:${secFiller}${date.getSeconds()}`

    return dura
}

// get config
const config = require('./../../config.json')
    // later used, it's self explaning
const progressbar = require('string-progressbar')

// create the command
module.exports = {
    commands: ['spotify'],
    expectedArgs: '[user]',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 1,
    cooldown: 60000,
    description: "this description is weird",
    callback: async(message, arguments, text) => {
        const Discord = require('discord.js')

        // second argument?
        if (!arguments[0]) {
            // no xd, fetch the user
            await message.client.users.fetch(message.author.id, false)

            // search for spotify presence
            var result
            const acts = await message.member.presence.activities
            await acts.forEach(Activity => {
                    if (Activity.name.toLowerCase() === "spotify") {
                        result = Activity
                    }
                })
                // there was no spotify presence
            if (!result) {
                message.reply(`Du hörst gerade nichts auf Spotify.`)
                return
            }

            // calculate the progressbar
            const songlenght = new Date(await result.timestamps.end.toString()).getTime() - new Date(await result.timestamps.start.toString()).getTime()
            const lenghtInSeconds = (new Date(songlenght).getSeconds() + new Date(songlenght).getMinutes() * 60 + (new Date(songlenght).getHours() + new Date(songlenght).getTimezoneOffset() / 60) * 3600)
            const currentSeconds = Date.now().toString().slice(0, -3) - result.createdTimestamp.toString().slice(0, -3)
            const values = progressbar.filledBar(lenghtInSeconds, currentSeconds, [size = 38])

            // create the embed
            const embed = new Discord.EmbedBuilder()
                .setColor(config.standard_color)
                .setDescription("Du hörst gerade auf Spotify:")
                .addFields([
                     { name: "Titel:", value: `\`${result.details}\``, inline: true },
                     { name: "Album:", value: `\`${result.assets.largeText}\``, inline: true },
                     { name: "Dauer:", value: `\`${await getDuration(new Date(result.timestamps.start.toString()).getTime(), new Date(result.timestamps.end.toString()).getTime())}\``, inline: true}
                ])

            if (result.state.includes(';')) { // artist or artists
                embed.addFields([{ name: "Interpreten:", value: `\`${result.state.replaceAll(';', ',')}\``, inline: true}])
            } else { embed.addFields([{ name: "Interpret:", value: `\`${result.state.replaceAll(';', ',')}\``, inline: true}]) }
            embed.addFields([{ name: 'Link:', value: `[${result.details}](https://open.spotify.com/track/${result.syncId} "${result.details} in Spotify öffnen")`, inline: false}])
                .addFields([{ name: `${values[0]}`, value: `​`, inline: true}])
                .setThumbnail(`https://i.scdn.co/image/${result.assets.largeImage.slice(8)}`)
                .setTimestamp()
                .setFooter({
                    text: message.guild.name,
                    iconURL: message.guild.iconURL({ dynamic: true })
                })


            // send the embed
            message.reply({ embeds: [embed] })

        } else {
            // the same as above, but with a user as the second argument
            getMember(message)
            let user = getMember(message, arguments[0])
                // iS iT a UsEr?
            if (!user) {
                message.reply(`\`${arguments[0].substring(0, 50)}\` ist kein gültiger Nutzer!`)
                return
            }
            await message.client.users.fetch(user.id, false)

            var result
            const acts = await user.presence.activities
            await acts.forEach(Activity => {
                if (Activity.name.toLowerCase() === "spotify") {
                    result = Activity
                }
            })
            if (!result) {
                message.reply(`\`${user.user.username}\` hört gerade nichts auf Spotify.`)
                return
            }

            const songlenght = new Date(await result.timestamps.end.toString()).getTime() - new Date(await result.timestamps.start.toString()).getTime()
            const lenghtInSeconds = (new Date(songlenght).getSeconds() + new Date(songlenght).getMinutes() * 60 + (new Date(songlenght).getHours() + new Date(songlenght).getTimezoneOffset() / 60) * 3600)
            const currentSeconds = Date.now().toString().slice(0, -3) - result.createdTimestamp.toString().slice(0, -3)
            const values = progressbar.filledBar(lenghtInSeconds, currentSeconds)


            const embed = new Discord.EmbedBuilder()
                .setColor(config.standard_color)
                .setDescription(user.user.username + " hört gerade auf Spotify:")
                .addFields([
                    { name: "Titel:", value: `\`${result.details}\``, inline: true },
                    { name: "Album:", value: `\`${result.assets.largeText}\``, inline: true },
                    { name: "Dauer:", value: `\`${await getDuration(new Date(result.timestamps.start.toString()).getTime(), new Date(result.timestamps.end.toString()).getTime())}\``, inline: true}
                ])

            if (result.state.includes(';')) {
                embed.addFields([{ name: "Interpreten:", value: `\`${result.state.replaceAll(';', ',')}\``, inline: true}])
            } else { embed.addFields([{ name: "Interpret:", value: `\`${result.state.replaceAll(';', ',')}\``, inline: true}]) }
            embed.addFields([{ name: 'Link:', value: `[${result.details}](https://open.spotify.com/track/${result.syncId} "${result.details} in Spotify öffnen")`, inline: false}])
                .addFields([{ name: `${values[0]}`, value: `​`, inline: true}])
                .setThumbnail(`https://i.scdn.co/image/${result.assets.largeImage.slice(8)}`)
                .setTimestamp()
                .setFooter({
                    text: message.guild.name,
                    iconURL: message.guild.iconURL({ dynamic: true })
                })



            message.reply({ embeds: [embed] })
        }

    },
    permissions: [],
    requiredRoles: ['Nice One']
}