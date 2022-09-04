const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const textthatishouldsay = interaction.options.getString('text')

    if ((textthatishouldsay.toLowerCase().includes('@here') || textthatishouldsay.toLowerCase().includes('@everyone') || textthatishouldsay.toLowerCase().includes('<@&')) && !interaction.member.permissions.has('MentionEveryone')) {
        interaction.reply('Nö <:troll:800321754873987112>')
        return
    }
    interaction.reply({ content: "Done", ephemeral: true })
    interaction.channel.send(textthatishouldsay.substring(0, 2040))

}