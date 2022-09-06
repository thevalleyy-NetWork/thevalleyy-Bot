const Discord = require('discord.js');
const config = require('../../config.json');
const { createClient } = require("pexels")
const paginationEmbed = require("../../functions/pagination.js")

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     

    const query = interaction.options.getString('query').substring(0, 255);
    var orientation = interaction.options.getString('orientation');
    if (!orientation) var orientation = '';
    var size = interaction.options.getString('size');
    if (!size) var size = '';
    var color = interaction.options.getString('color');
    if (!color) var color = '';
    var locale = interaction.options.getString('locale');
    if (!locale) var locale = '';

        const pexels = createClient(config.keys.pexels);
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
        pexels.photos.search({ query, orientation: orientation, size: size, color: color, locale: locale, per_page: 80 }).then(result => {
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