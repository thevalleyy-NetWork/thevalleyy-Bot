const fs = require('fs')
const Discord = require('discord.js')
const config = require('./../../config.json')

module.exports = {
    commands: ['command', 'cmd'],
    expectedArgs: '[alias]',
    permissionError: 'Hm.. Irgendwas ist schief gelaufen',
    minArgs: 0,
    maxArgs: 1,
    cooldown: 10000,
    description: "this description is weird",
    callback: (message, arguments, text) => {
        var iconurl = message.guild.iconURL({ dynamic: true })


        const cmd = arguments[0]
        const directory = './data/cmdinfo/';

        fs.readdir(directory, async(err, files) => {
            if (err) throw err;

            // is the alias in the directory?


            const allFiles = files.toString().replaceAll('.json', '').replaceAll('@', '').split(",")

            if (!arguments[0]) {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.standard_color)
                    .setTitle("Alle Commands")
                    .setTimestamp()
                    .setFooter({
                        text: message.guild.name,
                        iconURL: message.guild.iconURL({ dynamic: true })
                    })
                    .setDescription(`\`\`\`${allFiles.join(', ').replaceAll(", ", ",\n")}\`\`\``)
                message.reply({ embeds: [embed] })

                return
            }

            if (!allFiles.includes(`${cmd}`)) return message.reply(`Hm.. Es konnte kein Command gefunden werden.\nMit \`${message.content.split(" ")[0]}\` kannst du alle Commands sehen.`)
            for (const cmdname of allFiles) {
                if (cmdname === cmd) {
                    files.forEach(async file => {
                        if (file.includes(`@${cmd},`) || file.includes(`,${cmd}.json`) || file.includes(`,${cmd},`) || file.includes(`@${cmd}.json`)) {

                            const cmdjson = JSON.parse(fs.readFileSync(directory + file))

                            const embed = new Discord.MessageEmbed()
                                .setTitle(`${config.prefix}${cmd}`)
                                .setColor(config.standard_color)
                            if (cmdjson.commands.length > 1) {
                                embed.addField("Aliase:", `​\`\`${cmdjson.commands.toString().replace(/,/g, ", ")}\`\``, true)
                            } else { embed.addField("Alias:", `​\`\`${cmdjson.commands.toString().replace(/,/g, ", ")}\`\``, true) }

                            if (cmdjson.expectedArgs.replaceAll(" ", "").length == 0) {
                                embed.addField("Erwartetes Argument:", `​\`\`Keins\`\``, true)
                            } else if (cmdjson.expectedArgs.replaceAll(/<.*?>/gm, "").replaceAll(/\[.*?\]/gm, "").length == 0) {
                                embed.addField("Erwartetes Argument:", `​\`\`${cmdjson.expectedArgs.toString()}\`\``, true)
                            } else { embed.addField("Erwartete Argumente:", `​\`\`${cmdjson.expectedArgs.toString()}\`\``, true) }

                            if (cmdjson.description.replaceAll(" ", "").length == 0) {
                                embed.addField("Beschreibung:", `​\`\`Keine\`\``, true)
                            } else { embed.addField("Beschreibung:", `​\`\`${cmdjson.description.toString()}\`\``, true) }

                            if (!cmdjson.minArgs) {
                                var minarg = "∞"
                            } else { var minarg = cmdjson.minArgs }
                            if (!cmdjson.maxArgs) {
                                var maxarg = "∞"
                            } else { var maxarg = cmdjson.maxArgs }

                            embed.addField("Min. & Max. Argumente:", `​\`\`${minarg} | ${maxarg}\`\``, true)

                            if (cmdjson.permissions.length < 1) {
                                embed.addField("Berechtigung benötigt:", `​\`\`Keine\`\``, true)
                            } else if (cmdjson.permissions.length >= 2) {
                                embed.addField("Berechtigungen benötigt:", `​\`\`${cmdjson.permissions.toString().replace(/,/g, ", ")}\`\``, true)
                            } else {
                                embed.addField("Berechtigung benötigt:", `​\`\`${cmdjson.permissions.toString()}\`\``, true)
                            }

                            if (!cmdjson.cooldown) {
                                var cooldown = config.cooldown_standard
                            } else { var cooldown = cmdjson.cooldown }

                            d = Number(cooldown / 1000);
                            var h = Math.floor(d / 3600);
                            var m = Math.floor(d % 3600 / 60);
                            var s = Math.floor(d % 3600 % 60);

                            var hDisplay = h > 0 ? (h == 1 ? m > 0 ? `eine Stunde, ` : h == 1 ? `eine Stunde` : `${h} Stunden` : `${h} Stunden, `) : ``;
                            var mDisplay = m > 0 ? (m == 1 ? s > 0 ? `eine Minute, ` : m == 1 ? `eine Minute` : `${m} Minuten` : `${m} Minuten, `) : ``;
                            var sDisplay = s > 0 ? (s == 1 ? `eine Sekunde` : `${s} Sekunden`) : ``;

                            embed.addField("Cooldown:", `​\`\`${hDisplay + mDisplay + sDisplay}\`\``, true)

                            if (cmdjson.requiredRoles.length < 1) {
                                embed.addField("Rolle benötigt:", `​\`\`Keine\`\``, true)
                            } else {
                                const rollenids = []
                                cmdjson.requiredRoles.forEach(async role => {
                                    try {
                                        rollenids.push(`<@&${message.member.guild.roles.cache.find(roles => roles.name === role).id}>`)
                                    } catch (e) {
                                        rollenids.push(`\`\`${role}\`\``)
                                    }
                                });

                                if (cmdjson.requiredRoles.length >= 2) {
                                    embed.addField("Rollen benötigt:", `​${rollenids.toString().replace(/,/g, ", ")}`, true)
                                } else {
                                    embed.addField("Rolle benötigt:", `​${rollenids.toString().replace(/,/g, ", ")}`, true)
                                }
                            }

                            embed.setFooter({ text: message.guild.name, iconURL: iconurl })
                                .setTimestamp()
                            message.reply({ embeds: [embed] })
                        }
                    });


                }





            }
        });



    },
    permissions: [],
    requiredRoles: []
}