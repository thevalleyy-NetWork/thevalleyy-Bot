const modlog = '822575095721099304'
const Discord = require('discord.js')

module.exports = (client) => {
    var iconurl = client.guilds.cache.get("631518992342843392").iconURL()
    client.on("guildMemberAdd", member => {
        try {
            let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Nice One').id
            setTimeout(() => member.roles.add(welcomeRole), 4000)
        } catch (error) {
            const embedError = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler beim Vergeben einer Rolle')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(member.user.tag, "Nice One")
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('fc036b')
            client.channels.cache.get(modlog).send({ embeds: [embedError] })
        }

    })
}