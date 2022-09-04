const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

        const hackertext1 = interaction.options.getString("text")

        if (hackertext1.toLowerCase().includes('@here') || (hackertext1.toLowerCase().includes('@everyone') || (hackertext1.toLowerCase().includes('<@&')))) return interaction.reply("lol nö")


        const hackertext2 = hackertext1.toLowerCase()
            .replaceAll('sus', '<:SUS:843876559941402654>')
            .replaceAll('leet', '1337')
            .replaceAll('a', '4')
            .replaceAll('i', '1')
            .replaceAll('e', '3')
            .replaceAll('a', '@')
            .replaceAll('1337', 'LEET')
            .replaceAll('i', '|')
            .replaceAll('s', '5')
            .replaceAll('s', '2')
            .replaceAll('o', '0')
            .replaceAll('n', '|/|')
            .replaceAll('d', '|)')
            .replaceAll('m', '|\|/|')
            .replaceAll('g', 'q')
            .replaceAll('l', '|_')
            .replaceAll('t', "']['")
            .replaceAll('b', '|>')
            .replaceAll('c', '<')
            .substring(0, 300)
        interaction.channel.send(hackertext2)

}