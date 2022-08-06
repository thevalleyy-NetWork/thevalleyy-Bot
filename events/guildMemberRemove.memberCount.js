const modlog = '822575095721099304'
const Discord = require('discord.js')

const channelId = '786239370020913162'

module.exports = (client, member) => {

    const updateMembers = async(guild = member.guild) => {
        var memberCount = await guild.members.cache.filter(member => !member.user.bot).size;
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Mitglieder: ${memberCount.toLocaleString()}`, 'updating membercount')
    }

    

    try {
        updateMembers(member.guild)
    } catch (error) {
        message.client.cache.channels.get(modlog).send(`Fehler beim Updaten der Mitgliederanzeige (${channelID}): ${error}`)
    }

}