const modlog = '822575095721099304'
const Discord = require('discord.js')

module.exports = async(client, oldMember, newMember) => {
        if (newMember.guild.id != '631518992342843392') return
        if (oldMember.nickname === newMember.nickname) return
        var iconurl = client.guilds.cache.get(newMember.guild.id).iconURL({
            dynamic: true
        })

        const fetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: 24 // MemberUpdate = 24
        })
        const latest = fetchedLogs.entries.first()
        const executor = latest.executor
        if (!latest) return

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


        const embedNickLog = new Discord.EmbedBuilder()
            .setTitle('LOG: Nickname geändert')
            .addFields([
                { name: 'User', value:  `\`${newMember.user.tag}\`, <@!${newMember.user.id}>` },
                { name: "Vorher: ", value: `\`${oldname}\`` },
                { name: "Nachher: ", value: `\`${newname}\`` },
                { name: "Ausgeführt von:", value: `<@!${executor.id}>`}
            ])

            .setFooter({ text: newMember.guild.name, iconURL: iconurl})
            .setTimestamp()
            .setColor('#24E498')
        client.channels.cache.get(modlog).send({ embeds: [embedNickLog] })
}