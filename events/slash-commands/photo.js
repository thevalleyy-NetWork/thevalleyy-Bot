const Discord = require('discord.js');
const config = require('../../config.json');
const { createClient } = require("pexels")
const paginationEmbed = require("../../functions/pagination.js")

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

        //  "\nColor: 'red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'violet', 'pink', 'brown', 'black', 'gray' \nOrientation: 'landscape', 'portrait', 'square' \nSize: 'small', 'medium', 'large',"

        const pexels = createClient(config.keys.pexels);
        const query = interaction.options.getString("query").substring(0, 255);
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
        if (result.photos.length == 0) return interaction.reply('Es wurden keine Bilder gefunden.')
        for (let i = 0; i < result.photos.length; i++) {
            const photo = result.photos[i];
            const embed = new Discord.EmbedBuilder()
            .setTitle("Fotosuche: " + query)
            .setColor(photo.avg_color)
            .setTimestamp()
            .setAuthor({name: photo.photographer, url: photo.photographer_url})
            .setImage(photo.src.original + "?auto=compress")
            .setFooter( {text: `${photo.width}x${photo.height}`, iconURL: interaction.guild.iconURL()})
            .setDescription(`[${photo.alt}](${photo.src.original}) von [${photo.photographer}](${photo.photographer_url}) auf [Pexels](https://www.pexels.com)`)
            array.push(embed)
        }
        paginationEmbed(interaction, array, buttonList, 120000);
    })
    } catch (error) {
        //ERROR
        console.log(error)
        interaction.reply("Es ist ein Fehler aufgetreten. Tut mir Leid :(")
    }

}