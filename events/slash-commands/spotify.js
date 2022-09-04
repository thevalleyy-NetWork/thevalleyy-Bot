const Discord = require('discord.js');
const config = require('../../config.json');
const progressbar = require('string-progressbar');

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


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;


    // second argument?
    if (!interaction.options.get('user')) {
        // no xd, fetch the user
        await client.users.fetch(interaction.user.id, false)

        // search for spotify presence
        var result
        const acts = await interaction.member.presence.activities
        await acts.forEach(Activity => {
                if (Activity.name.toLowerCase() === "spotify") {
                    result = Activity
                }
            })
            // there was no spotify presence
        if (!result) {
            interaction.reply(`Du hörst gerade nichts auf Spotify.`)
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
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL()
            })


            const lyricsButton = new Discord.ButtonBuilder()
            .setCustomId('SPOTIFY_lyrics')
            .setLabel('Lyrics')
            .setStyle('Primary') 

            const button = new Discord.ActionRowBuilder().addComponents(lyricsButton)


        // send the embed
        interaction.reply({ embeds: [embed], components: [button] })

    } else {
        // the same as above, but with a user as the second argument
        
        const user = interaction.options.get('user');
        await client.users.fetch(user.user.id, false)

        var result
        const acts = await user.member.presence.activities
        await acts.forEach(Activity => {
            if (Activity.name.toLowerCase() === "spotify") {
                result = Activity
            }
        })
        if (!result) {
            interaction.reply(`\`${user.user.username}\` hört gerade nichts auf Spotify.`)
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
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL()
            })


            const lyricsButton = new Discord.ButtonBuilder()
            .setCustomId('SPOTIFY_lyrics')
            .setLabel('Lyrics')
            .setStyle('Primary') //TODO: in Slash commands integrieren

            const button = new Discord.ActionRowBuilder().addComponents(lyricsButton)

            interaction.reply({ embeds: [embed], components: [button] })
    }

}