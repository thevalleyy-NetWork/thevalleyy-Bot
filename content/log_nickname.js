const botlog = '822575095721099304'
const Discord = require('discord.js')

module.exports = async(client) => {


    client.on('guildMemberUpdate', async(oldMember, newMember) => {
        if (oldMember.nickname === newMember.nickname) return
        var iconurl = client.guilds.cache.get(newMember.guild.id).iconURL({
            dynamic: true
        })

        const fetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_UPDATE'
        })
        const latest = fetchedLogs.entries.first()
        const executor = latest.executor
        if (newMember.nickname === null) {
            var oldname = oldMember.nickname
            var newname = newMember.user.username
        } else if (oldMember.nickname === null) {
            var oldname = oldMember.user.username
            var newname = newMember.nickname
        } else {
            var oldname = oldMember.nickname
            var newname = newMember.nickname
        }


        const embedNickLog = new Discord.MessageEmbed()
            .setTitle('LOG: Nickname geändert')
            .addField('User:', `${newMember.user.tag}, <@!${newMember.user.id}>`)
            .addField("Vorher: ", `\`${oldname}\``, true)
            .addField("Nachher: ", `\`${newname}\``, true)
            .addField("Ausgeführt von: ", `<@!${executor.id}>`, true)
            .setFooter(newMember.guild.name, iconurl)
            .setTimestamp()
            .setColor('#24E498')
        client.channels.cache.get(botlog).send({ embeds: [embedNickLog] })
    })
}