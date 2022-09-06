const Discord = require('discord.js');
const config = require('../../config.json');
const modlog = config.mod_log_channel_id


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     

    const user = interaction.options.get('user');
    const reason = interaction.options.getString('reason');

    if (user.id === interaction.user.id) return interaction.reply( {content: 'Du kannst dich nicht selbst kicken, ' + interaction.user.username, ephemeral: true} );

    try {
    try {
        await user.user.send("Du wurdest auf dem Server `" + interaction.guild.name + "`" + (reason ? " mit dem Grund `" + reason + "` " : " ") + "von `" + interaction.user.tag + "` gekickt.") 
    } catch (e) {
        //ERROR
    }

    await user.member.kick(reason + ", Kick von: " + interaction.user.tag).catch(e => {
        interaction.reply( {content: 'Ich konnte den User nicht kicken, ' + interaction.user.username, ephemeral: true} );
        return
    });
    await interaction.reply('Der User `' + user.user.tag + '` wurde mit dem Grund `' + reason + "` gekickt.")
} catch (error) {
    //ERROR
}
} 