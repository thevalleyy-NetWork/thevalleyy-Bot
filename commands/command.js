const fs = require('fs')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    commands: ['command', 'cmd'],
    expectedArgs: '[alias]',
    permissionError: 'Hm.. Irgendwas ist schief gelaufen',
    minArgs: 0,
    maxArgs: 1,
    cooldown: null,
    description: "Zeigt dir Infos über einen Befehl an.",
    callback: async (message, arguments, text) => {
        const iconurl = message.guild.iconURL({ dynamic: true })


        const cmd = arguments[0]
        const directory = './data/cmdinfo/';

        fs.readdir(directory, async(err, files) => {
            if (err) throw err;

            // is the alias in the directory?


            const allFiles = files.toString().replaceAll('.json', '').replaceAll('@', '').split(",")

            if (!arguments[0]) {
                const embed = new Discord.EmbedBuilder()
                    .setColor(config.standard_color)
                    .setTitle("Alle " + allFiles.length + " Commands")
                    .setTimestamp()
                    .setFooter({
                        text: message.guild.name,
                        iconURL: message.guild.iconURL({ dynamic: true })
                    })
                    .setDescription(`\`\`\`${allFiles.join(', ').replaceAll(", ", ",\n")}\`\`\``)
                message.reply({ embeds: [embed] })

                return
            }

            let allCommands = []

            for (let i = 0; i < allFiles.length; i++) {
                const string = allFiles[i]

                if (string.includes(";")) {
                    // trennen und einzeln pushen
                    const split = string.split(";")
                    for (let i = 0; i < split.length; i++) {
                        allCommands.push(split[i])
                    }

                } else {
                    allCommands.push(string)
                }
            }

            if (!allCommands.includes(`${cmd}`)) return message.reply(`Hm.. Es konnte kein Command gefunden werden.\nMit \`${message.content.split(" ")[0]}\` kannst du alle Commands sehen.`)
            for (const cmdname of allCommands) {
                if (cmdname === cmd) {
                    files.forEach(async file => {
                        if (file.includes(`@${cmd};`) || file.includes(`;${cmd}.json`) || file.includes(`;${cmd};`) || file.includes(`@${cmd}.json`)) {

                            const cmdjson = JSON.parse(fs.readFileSync(directory + file))

                            const embed = new Discord.EmbedBuilder()
                                .setTitle(`${config.prefix}${cmd}`)
                                .setColor(config.standard_color)
                            if (cmdjson.commands.length > 1) {
                                embed.addFields([{ name: "Aliase:", value: `​\`\`${cmdjson.commands.toString().replace(/,/g, ", ")}\`\``, inline: true}])
                            } else { embed.addFields([{ name: "Alias:", value: `​\`\`${cmdjson.commands.toString().replace(/,/g, ", ")}\`\``, inline: true}])}

                            if (cmdjson.expectedArgs.replaceAll(" ", "").length == 0) {
                                embed.addFields([{ name: "Erwartetes Argument:", value: `​\`\`Keins\`\``, inline: true}])
                            } else if (cmdjson.expectedArgs.replaceAll(/<.*?>/gm, "").replaceAll(/\[.*?\]/gm, "").length == 0) {
                                embed.addFields([{ name: "Erwartetes Argument:", value: `​\`\`${cmdjson.expectedArgs.toString()}\`\``, inline: true}])
                            } else { embed.addFields([{ name: "Erwartete Argumente:", value: `​\`\`${cmdjson.expectedArgs.toString()}\`\``, inline: true}])}

                            if (cmdjson.description.replaceAll(" ", "").length == 0) {
                                embed.addFields([{ name: "Beschreibung:", value: `​\`\`Keine\`\``, inline: true}])
                            } else { embed.addFields([{ name: "Beschreibung:", value: `​\`\`${cmdjson.description.toString()}\`\``, inline: true}])}

                            if (!cmdjson.minArgs) {
                                var minarg = "∞"
                            } else { var minarg = cmdjson.minArgs }
                            if (!cmdjson.maxArgs) {
                                var maxarg = "∞"
                            } else { var maxarg = cmdjson.maxArgs }

                            embed.addFields([{ name: "Min. & Max. Argumente:", value: `​\`\`${minarg} | ${maxarg}\`\``, inline: true}])

                            if (cmdjson.permissions.length < 1) {
                                embed.addFields([{ name: "Berechtigung benötigt:", value: `​\`\`Keine\`\``, inline: true}])
                            } else if (cmdjson.permissions.length >= 2) {
                                embed.addFields([{ name: "Berechtigungen benötigt:", value: `​\`\`${cmdjson.permissions.toString().replace(/,/g, ", ")}\`\``, inline: true}])
                            } else {
                                embed.addFields([{ name: "Berechtigung benötigt:", value: `​\`\`${cmdjson.permissions.toString()}\`\``, inline: true}])
                            }

                            if (!cmdjson.cooldown) {
                                var cooldown = config.cooldown_standard
                            } else { var cooldown = cmdjson.cooldown }

                            d = Number(cooldown / 1000);
                            var h = Math.floor(d / 3600);
                            var m = Math.floor(d % 3600 / 60);
                            var s = Math.floor(d % 3600 % 60);

                            var hDisplay = +h > 0 ? (+h == 1 ? +m > 0 ? `eine Stunde, ` : +h == 1 ? `eine Stunde` : `${h} Stunden` : +m > 0 ? `${h} Stunden, ` :`${h} Stunden`) : ``;
                            var mDisplay = +m > 0 ? (+m == 1 ? +s > 0 ? `eine Minute, ` : +m == 1 ? `eine Minute` : `${m} Minuten` : +s > 0 ? `${m} Minuten, ` : `${m} Minuten`) : ``;
                            var sDisplay = +s > 0 ? (+s == 1 ? `eine Sekunde` : `${s} Sekunden`) : ``;

                            embed.addFields([{ name: "Cooldown:", value: `​\`\`${hDisplay + mDisplay + sDisplay}\`\``, inline: true}])

                            if (cmdjson.requiredRoles.length < 1) {
                                embed.addFields([{ name: "Rolle benötigt:", value: `​\`\`Keine\`\``, inline: true}])
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
                                    embed.addFields([{ name: "Rollen benötigt:", value: `​${rollenids.toString().replace(/,/g, ", ")}`, inline: true}])
                                } else {
                                    embed.addFields([{ name: "Rolle benötigt:", value: `​${rollenids.toString().replace(/,/g, ", ")}`, inline: true}])
                                }

                                const fileInCmdDir = file.replace(/;([\s\S]*)$/, "").replace("@", "").replace(".json", "") + ".js";

                             fs.stat("./commands/" + fileInCmdDir, async (err, stats) => {
                                    if (err) {
                                        console.log(err)
                                        await embed.addFields([{ name: "Filesize:", value: `​\`\`n/a\`\``, inline: true}])
                                    } else {
                                        await embed.addFields([{ name: "Filesize:", value: `​\`\`${await stats.size}\`\` bytes`, inline: true}])
                                    }

                                    

                                    // i dont fucking now why i have to add the code here, it just works
                                    embed.setFooter({ text: message.guild.name, iconURL: iconurl })
                                    .setTimestamp()
                                    
                                 message.reply({ embeds: [embed] })
                                })
                            }


                        }
                    });


                }





            }
        });



    },
    permissions: [],
    requiredRoles: ["Nice One"]
}