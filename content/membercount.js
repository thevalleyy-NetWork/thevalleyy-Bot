const mod - log = '822575095721099304'
const Discord = require('discord.js')
module.exports = (client) => {
    const channelId = '786239370020913162'

    const updateMembers = (guild) => {
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Mitglieder: ${guild.memberCount.toLocaleString()}`, 'updating membercount')
    }

    client.on('guildMemberAdd', (member) => updateMembers(member.guild), )

    client.on('guildMemberRemove', (member) => updateMembers(member.guild), )

    const guild = client.guilds.cache.get('631518992342843392')
    try {
        updateMembers(guild)
    } catch (error) {
        message.client.cache.channels.get(mod - log).send(`Fehler beim Updaten der Mitgliederanzeige (${channelID}): ${error}`)
    }
}