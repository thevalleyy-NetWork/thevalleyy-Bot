module.exports = {
    commands: ['text'],
    expectedArgs: '<text>',
    permissionError: 'Hm.. Irgendwas ist schief gelaufen',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const mod - log = '822575095721099304'
        const Discord = require('discord.js')

        const textthatishouldsay = text

        if (textthatishouldsay.toLowerCase().includes('@here') || (textthatishouldsay.toLowerCase().includes('@everyone') || (textthatishouldsay.toLowerCase().includes('<@&')))) {
            message.reply('Nö <:troll:800321754873987112>')
            return
        }
        message.delete()
        message.channel.send(textthatishouldsay.substring(0, 300))


        const successEmbed = new Discord.MessageEmbed()
            .setTitle('-text ausgeführt')
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
            .setDescription('Text: `' + textthatishouldsay.substring(0, 35) + '`')
            .addField(message.author.tag, 'in <#' + message.channel.id + '>')
            .setFooter('thevalleyy-NetWork', iconurl)
            .setTimestamp()
            .setColor('03f8fc')
        message.client.channels.cache.get(mod - log).send({ embeds: [successEmbed] })
    },
    permissions: [],
    requiredRoles: ['Nice One']
}