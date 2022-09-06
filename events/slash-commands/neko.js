const Discord = require('discord.js');
const config = require('../../config.json');
const nekochannel = '799728881228709928'

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     

    const fetch = (await import ('node-fetch')).default

    if (interaction.channel.id !== nekochannel && interaction.user.id !== config.owner) return interaction.reply({ content: `Bitte nutzen diesen Command nur in <#${nekochannel}>`, ephemeral: true });
    
    if (!interaction.options.getString('type')) {
        var types = ['hug', 'cry', 'smug', 'slap', 'pat', 'laugh', 'feed', 'cuddle']
        var type = types[Math.floor(Math.random() * types.length)]
    } else {
        var type = interaction.options.getString('type')
    }
    
    try {
        const { image } = await fetch('http://api.nekos.fun:8080/api/' + type).then(response => response.json())
        interaction.reply(image)
    } catch (error) {
        //ERROR
        console.log(error)
        interaction.reply('Es gab einen Fehler.')
    }
}