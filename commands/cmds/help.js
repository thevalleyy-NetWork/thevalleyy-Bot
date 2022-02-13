module.exports = {
    commands: ['help'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {
        
        var iconurl = message.guild.iconURL({dynamic: true})
        const Discord = require('discord.js')


        if (message.member.permissions.has('MANAGE_NICKNAMES'))
                {const adminEmbed = new Discord.MessageEmbed()
                    .setTitle('Abgerufen von: ' + message.author.username)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription('Admin-Commands:')
                    .addFields(
                     {name: '-games', value: 'Zeigt das Game-GUI.', inline:true},
                     {name: '-help', value: 'Zeigt alle für dich verfügbaren Commands.', inline:true},
                     {name: '-avatar', value: 'Zeigt dein Profilbild, oder das des getaggten Users.', inline:true},
                     {name: '-adminbewerbung', value: 'Gibt das Formular für die Adminbewerbung auf diesem Discord aus. ^^', inline:true},
                     {name: '-neko', value: 'Katzenbilder. Ihr werdet sehen. nur in <#799728881228709928> verfügbar!', inline:true},
                     {name: '-tp | -TP | -texturepack', value: 'Download-Link zum neuesten Release des thevalleyyTP.', inline:true},
                     {name: '-text', value: 'Lässt den Bot reden.', inline:true},
                     {name: '-mc | -mcserver | -minecraftserver', value: 'Infos zu meinem Minecraftserver.', inline:true},
                     {name: '-ping', value: 'Gibt den Bot/API Ping an.', inline:true},
                     {name: '-servers', value: 'Zeigt Infos über die Server, auf denen der Bot ist.', inline:true},
                     {name: '-cls | -clear', value: 'Soon:tm:.', inline:true},
                     {name: '-status', value: 'Updatet den Bot-Status.', inline:true},   
                     {name: '-kick', value: 'Kickt den getaggten User.', inline:true},     
                     {name: '-ban', value: 'Bannt den getaggten User.', inline:true},  
                     {name: '-restart', value: 'Startet den Bot neu.', inline:true},               
                     {name: '-mute', value: 'Entzieht dem getaggten User das Schreibrecht.', inline:true}, 
                     {name: '-unmute', value: 'Gibt dem Getaggten User das Schreibrecht.', inline:true}, 
                     {name: '-niceone', value: 'Entfernt/Gibt den "Nice One" Status.', inline:true}, 
                     {name: '-dmsend', value: 'Schicke eine DM per Bot an den getaggten User.', inline:true}, 
                     {name: '-rusas | -rasus', value: 'RUUUUUUUUUUUUUUUUUUUSAS', inline:true}, 
                     {name: '-close', value: 'Schließt ein offenes Ticket', inline: true},
                     {name: '-archive', value: 'Archiviert ein geschlossenes Ticket', inline: true},
                     {name: '-del', value: 'Löscht ein geschlossenes Ticket', inline: true})
                    .setFooter('thevalleyy-NetWork', iconurl)
                    .setTimestamp()
                    .setColor('149C51')
                     message.reply({ embeds: [adminEmbed]})
                  }
            
            
        else {
                const userEmbed = new Discord.MessageEmbed()
                .setTitle('Abgerufen von: ' + message.author.username)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription('Hier die Commands für User:')
                .addFields(
                 {name: '-games', value: 'Zeigt das Game-GUI.', inline:true},
                 {name: '-help', value: 'Zeigt alle für dich verfügbaren Commands.', inline:true},
                 {name: '-avatar', value: 'Zeigt dein Profilbild, oder das des getaggten Users.', inline:true},
                 {name: '-adminbewerbung', value: 'Gibt das Formular für die Adminbewerbung auf diesem Discord aus. ^^', inline:true},
                 {name: '-neko', value: 'Katzenbilder. Ihr werdet sehen. nur in <#> verfügbar!', inline:true},
                 {name: '-tp | -TP | -texturepack', value: 'Download-Link zum neuesten Release des thevalleyyTP.', inline:true},
                 {name: '-text', value: 'Lässt den Bot reden.', inline:true},
                 {name: '-mc | -mcserver | -minecraftserver', value: 'Infos zu meinem Minecraftserver.', inline:true},
                 {name: '-ping', value: 'Gibt den Bot/API Ping an.', inline:true},
                 {name: '-rusas | -rasus', value: 'RUUUUUUUUUUUUUUUUUUUSAS', inline:true},
                 {name: '-close', value: 'Schließt ein offenes Ticket', inline: true} )
                .setFooter('thevalleyy-NetWork', iconurl)
                .setTimestamp()
                .setColor('149C51')
                 message.reply({ embeds: [userEmbed]})
                }

    },
    permissions: [],
    requiredRoles: ['Mitglied']
}




