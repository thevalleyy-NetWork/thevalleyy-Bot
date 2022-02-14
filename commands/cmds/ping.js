const Discord = require('discord.js');

module.exports = {
    commands: ['ping', 'info'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    callback: async(message, arguments, text) => {

        let tps = 0
        s = Date.now()
        while (Date.now() - s <= 1) tps++
            tps *= 1000 //:HugTomate:

        let totalSeconds = (message.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `\`${days}\` Tage, \`${hours}\` Stunden, \`${minutes}\` Minuten und \`${seconds}\` Sekunden`;

        var iconurl = message.guild.iconURL({
            dynamic: true
        })


        const prePingEmbed = new Discord.MessageEmbed()
            .setTitle("...")
            .setColor("#36393f")
        message.reply({ embeds: [prePingEmbed] }).then(m => {
            const pingEmbed = new Discord.MessageEmbed()
                .setTitle('Bot-Info')
                .addField('Bot:', `\`${m.createdTimestamp - message.createdTimestamp}\`ms`, true)
                .addField("API: ", `\`${Math.round(message.client.ws.ping)}\`ms`, true)
                .addField("TPS: ", `\`${tps}\``, true)
                .addField("Uptime: ", `${uptime}`, true)
                .setFooter(message.guild.name, iconurl)
                .setTimestamp()
                .setColor('#36393f')
            m.edit({ embeds: [pingEmbed] })
        })

        // message.reply('...').then(m => {
        //     m.edit("- Bot: `" + `${m.createdTimestamp - message.createdTimestamp}` + "ms`\n- API: `" + `${Math.round(message.client.ws.ping)}` + "ms`\n- TPS: `" + tps + "`")
        // })

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}