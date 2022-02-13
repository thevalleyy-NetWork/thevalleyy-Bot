module.exports = {
    commands: ['hackerman'],
    expectedArgs: '<text>',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text) => {

        var iconurl = message.guild.iconURL({ dynamic: true })
        const botlog = '822575095721099304'
        const Discord = require('discord.js')
        const hackertext1 = text

        if (hackertext1.toLowerCase().includes('@here') || (hackertext1.toLowerCase().includes('@everyone') || (hackertext1.toLowerCase().includes('<@&')))) return
        message.delete()


        const hackertext2 = hackertext1.toLowerCase().replaceAll('a', '4')
            .replaceAll('i', '1')
            .replaceAll('e', '3')
            .replaceAll('a', '@')
            .replaceAll('1337', 'LEET')
            .replaceAll('leet', '1337')
            .replaceAll('i', '|')
            .replaceAll('s', '5')
            .replaceAll('s', '2')
            .replaceAll('o', '0')
            .replaceAll('n', '|/|')
            .replaceAll('d', '|)')
            .replaceAll('m', '|\|/|')
            .replaceAll('g', 'q')
            .replaceAll('l', '|_')
            .replaceAll('t', "']['")
            .replaceAll('b', '|>')
            .replaceAll('c', '<')
            .replaceAll('sus', '<:SUS:843876559941402654>')
            .substring(0, 300)
        message.channel.send(hackertext2)


        const successEmbed = new Discord.MessageEmbed()
            .setTitle('-hackerman ausgeführt')
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlLhEcHAO0tT48khBLEl8P70JHpAHJumUgg&usqp=CAU%27')
            .setDescription('Text: `' + hackertext1.substring(0, 400) + '`')
            .addField(message.author.tag, 'in <#' + message.channel.id + '>')
            .setFooter('thevalleyy-NetWork', iconurl)
            .setTimestamp()
            .setColor('03f8fc')
        message.client.channels.cache.get(botlog).send({ embeds: [successEmbed] })
    },
    permissions: [],
    requiredRoles: ['Nice One']
}