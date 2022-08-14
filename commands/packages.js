const Discord = require('discord.js')
const package = require('../package.json')
const config = require('../config.json')

module.exports = {
    commands: ['packages', 'package'],
    expectedArgs: '',
    permissionError: '',
    minArgs: null,
    maxArgs: null,
    cooldown: null,
    description: "Zeigt dir alle installierten npmjs-Packages.",
    callback: (message, arguments, text) => {

        const iconurl = message.guild.iconURL()
        let array = []

        for (let i = 0; i < Object.keys(package.dependencies).length; i++) {
            array.push(Object.keys(package.dependencies)[i] + ": v" + Object.values(package.dependencies)[i])
        }


        const embed = new Discord.EmbedBuilder()
        .setColor(config.standard_color)
        .setTitle(package.name + ' v' + package.version)
        .setDescription("Packages:\n" + `\`\`\`${array.join(', ').replaceAll(", ", ",\n")}\`\`\``)
        .setThumbnail(message.client.user.avatarURL(  ))
        .addFields([
            { name: 'Start-Datei', value: "`" + package.main + "`", inline: true },
            { name: "Description", value: "`" + package.description + "`", inline: true }
        ])
        
        message.reply({ embeds: [embed]})
    },
    permissions: [],
    requiredRoles: ['Mitglied']
}
