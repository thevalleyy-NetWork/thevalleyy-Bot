const Discord = require('discord.js')
const modlog = '822575095721099304'

module.exports = {
    commands: ['skin', 'mcskin', 'minecraftskin'],
    expectedArgs: '<name/uuid>',
    permissionError: 'Du bist nicht berechtigt, diesen Befehl zu nutzen.',
    minArgs: 1,
    maxArgs: 1,
    cooldown: 10000,
    description: "this description is weird",
    callback: async(message, arguments, text) => {

		const fetch = (await import ('node-fetch')).default

        const mcreq = arguments[0].substring(0, 20)
        try {
            await fetch('https://mineskin.eu/armor/body/' + mcreq).then(async response => {

                if (response.status !== 200) {
                    const notFound = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Es gab einen Fehler...')
                        .setDescription("`" + response.statusText + "`")
                        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    message.reply({ embeds: [notFound] })
                    return
                }

                const found = new Discord.MessageEmbed()
                    .setTitle('Skin von ' + mcreq)
                    .setColor('0099ff')
                    .setThumbnail('https://mineskin.eu/headhelm/' + mcreq)
                    .setImage(response.url)
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp()
                message.reply({ embeds: [found] })

            })
        } catch (error) {
            const failEmbed = new Discord.MessageEmbed()
                .setTitle('Es gab einen Fehler bei -skin')
                .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
                .setDescription('Fehler: `' + error + '`')
                .addField(message.author.tag, 'in <#' + message.channel.id + '>')
                .setFooter('thevalleyy-NetWork', message.guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .setColor('fc036b')
            message.client.channels.cache.get(modlog).send(({ embeds: [failEmbed] }))
            message.reply('Es gab einen Fehler.')
        }
    },
    permissions: [],
    requiredRoles: ['Nice One']
}