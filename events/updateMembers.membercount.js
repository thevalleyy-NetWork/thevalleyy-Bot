const modlog = '822575095721099304'
const Discord = require('discord.js')
module.exports = (client) => {
    const channelId = '786239370020913162'

    const updateMembers = async(guild) => {
        var memberCount = await guild.members.cache.filter(member => !member.user.bot).size;
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Mitglieder: ${memberCount.toLocaleString()}`, 'updating membercount')
    }

    client.on('guildMemberAdd', (member) => updateMembers(member.guild), )

    client.on('guildMemberRemove', (member) => updateMembers(member.guild), )

    const guild = client.guilds.cache.get('631518992342843392')
    try {
        updateMembers(guild)
    } catch (error) {
        message.client.cache.channels.get(modlog).send(`Fehler beim Updaten der Mitgliederanzeige (${channelID}): ${error}`)
    }
}