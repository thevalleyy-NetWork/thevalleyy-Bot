const Discord = require('discord.js')

function getMember(message, toFind = '') {
    toFind = toFind.toLowerCase()
    let target = message.guild.members.cache.get(toFind)

    if (!target && message.mentions.members)
        target = message.mentions.members.first()

    if (!target && toFind) {
        target = message.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind)
        })
    }

    if (!target) return
    return target
}

module.exports = {
    commands: ['kick'],
    expectedArgs: '<user> [reason]',
    permissionError: 'Unzureichende Rechte',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: "Kickt den angegebenen Nutzer",
    callback: async(message, arguments, text) => {

        const iconurl = message.guild.iconURL()
        const modlog = '822575095721099304'
        const reason = text.split(' ').slice(1).join(' ')

        let member = getMember(message, arguments[0])

        if (!member) return message.reply('Der User `' + arguments[0].substring(0, 100) + '` konnte nicht gefunden werden.')

        if (member.id === message.author.id) return message.reply('Du kannst dich nicht selbst kicken, ' + message.author.username)

        try{
        
        try {
            await member.user.send("Du wurdest auf dem Server `" + message.guild.name + "`" + (arguments[1] ? " mit dem Grund `" + reason + "` " : " ") + "von `" + message.author.tag + "` gekickt.") 
        } catch (e) {
            message.client.channels.cache.get(modlog).send(`Error at kick: \`${e}\``)
        }

        member.kick((arguments[1] ? reason + ", ": "") + "Kick von: " + message.author.tag )
        await message.reply('Der User `' + member.user.tag + '` wurde' + (arguments[1] ? " mit dem Grund `" + reason + "` gekickt." : " gekickt."))

        } catch (error) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('Es gab einen Fehler bei -kick')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addFields([{ name: message.author.tag, value: 'in <#' + message.channel.id + '>'}])
                .setFooter({ text: message.guild.name, iconURL: iconurl})
                .setTimestamp()
                .setColor('#fc036b')
            message.client.channels.cache.get(modlog).send({ embeds: [embed] })
            message.reply('Der User `' + member.user.tag + '` konnte nicht gekickt werden:\n`' + error + '`')
        }
    },
    permissions: [],
    requiredRoles: ['Supporter']
}