const Discord = require('discord.js');

module.exports = {
    commands: ['ping', 'info'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    cooldown: null,
    description: "this description is weird",
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


        const prePingEmbed = new Discord.EmbedBuilder()
            .setTitle("...")
            .setColor("#36393f")
        message.reply({ embeds: [prePingEmbed] }).then(m => {
            const pingEmbed = new Discord.EmbedBuilder()
                .setTitle('Bot-Info')
                .addFields([
                    { name: "Bot:", value: `\`${m.createdTimestamp - message.createdTimestamp}\`ms`, inline: true },
                    { name: "API:", value: `\`${Math.round(message.client.ws.ping)}\`ms`, inline: true },
                    { name: "TPS:", value: `\`${tps}\``, inline: true },
                    { name: "Uptime:", value: `${uptime}`, inline: true },
                ])

                .setFooter({ text: message.guild.name, iconURL: iconurl})
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