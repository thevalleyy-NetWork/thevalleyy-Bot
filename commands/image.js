const Discord = require('discord.js')
const config = require('../config.json')
const { createClient } = require("pexels")
const paginationEmbed = require('discordjs-button-pagination')

module.exports = {
    commands: ['photo', 'photograph', 'Foto'],
    expectedArgs: '<query> [color] [orientation] [size]',
    permissionError: '',
    minArgs: 1,
    maxArgs: null,
    cooldown: 20000,
    description: "Dieser Befehl sucht eine __Fotographie__ aus einer Bilddatenbank.",
    callback: (message, arguments, text) => {
    
        const iconurl = message.guild.iconURL({dynamic: true})
        //  "\nColor: 'red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'violet', 'pink', 'brown', 'black', 'gray' \nOrientation: 'landscape', 'portrait', 'square' \nSize: 'small', 'medium', 'large',"

        const pexels = createClient(config.keys.pexels);
        const query = text
        let array = []

        const button1 = new Discord.ButtonBuilder()
        .setCustomId('previousbtn')
        .setLabel('◀️')
        .setStyle("Secondary");

        const button2 = new Discord.ButtonBuilder()
            .setCustomId('nextbtn')
            .setLabel('▶️')
            .setStyle("Secondary");

        //create an array of buttons

        buttonList = [
            button1,
            button2
        ]

    try {
        pexels.photos.search({ query, per_page: 80 }).then(result => {

            if (result.photos.length == 0) return message.reply('Es wurden keine Bilder gefunden.')

            for (let i = 0; i < result.photos.length; i++) {
                const photo = result.photos[i];
                const embed = new Discord.EmbedBuilder()
                .setTitle("Fotosuche: " + text.substring(0, 100))
                .setColor(photo.avg_color)
                .setTimestamp()
                .setAuthor({name: photo.photographer, url: photo.photographer_url})
                .setImage(photo.src.original + "?auto=compress")
                .setFooter( {text: `${photo.width}x${photo.height}`, iconURL: iconurl})
                .setDescription(`[${photo.alt}](${photo.src.original}) von [${photo.photographer}](${photo.photographer_url}) auf [Pexels](https://www.pexels.com)`)

                array.push(embed)
            }

        paginationEmbed(message, array, buttonList, 120000);
    })
    } catch (error) {
        console.log(error)
        message.reply("Es ist ein Fehler aufgetreten. Tut mir Leid :(")
    }


        
        


        /*
        Whenever you are doing an API request make sure to show a prominent link to Pexels. You can use a text link (e.g. "Photos provided by Pexels") or a link with our logo.

        Always credit our photographers when possible (e.g. "Photo by John Doe on Pexels" with a link to the photo page on Pexels).
        */

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}