const Discord = require('discord.js');
const config = require('../../config.json');
const modlog = config.mod_log_channel_id


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     

    const iconurl = interaction.guild.iconURL()
    const user = interaction.options.get('user');
    const reason = interaction.options.getString('reason');
    const dmdays = interaction.options.get('dmdays');

    if (user.id === interaction.user.id) return interaction.reply( {content: 'Du kannst dich nicht selbst bannen, ' + interaction.user.username, ephemeral: true} );

    try {
    try {
        await user.user.send("Du wurdest auf dem Server `" + interaction.guild.name + "`" + (reason ? " mit dem Grund `" + reason + "` " : " ") + "von `" + interaction.user.tag + "` gebannt.") 
    } catch (e) {
        //ERROR
    }

    if (dmdays) {days = 7} else {days = 0}
    await user.member.ban({ deleteMessageDays: days, reason: reason + ", Ban von: " + interaction.user.tag + " (DMDs: " + days + ")"}).catch(e => {
        interaction.reply( {content: 'Ich konnte den User nicht bannen, ' + interaction.user.username, ephemeral: true} );
        return
    });
    await interaction.reply('Der User `' + user.user.tag + '` wurde mit dem Grund `' + reason + "` gebannt.")
} catch {
    //ERROR
}
} 