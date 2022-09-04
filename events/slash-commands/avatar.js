module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;


    if (!interaction.options.get('user')) {
        interaction.reply(interaction.user.avatarURL({ size: 4096 }))
    } else {
        interaction.reply(interaction.options.get('user').user.avatarURL({ size: 4096 })).catch((error) => {
            interaction.reply('Es gab einen Fehler: `' + error.substring(0, 500) + '`')
        })
    }
}