const mod - log = '822575095721099304'
const Discord = require('discord.js')

module.exports = async(client) => {


    client.on('voiceStateUpdate', async(oldState, newState) => {
        if (oldState.member.user.bot) return
        if (oldState.guild.id != '631518992342843392') return
        var iconurl = client.guilds.cache.get(oldState.guild.id).iconURL({
            dynamic: true
        })


        if (oldState.channelId === null) {

            const embedVoiceLog = new Discord.MessageEmbed()
                .setTitle('LOG: Kanal betreten')
                .addField('User:', `\`${oldState.member.user.tag}\`, <@!${oldState.member.user.id}>`)
                .addField("Kanal:", `<#${newState.channelId}>`, true)
                .addField("Muted:", `\`${newState.selfMute}\``, true)
                .addField("Globad Muted:", `\`${newState.serverMute}\``, true)
                .addField("Deaf:", `\`${newState.selfDeaf}\``, true)
                .addField("Globad Deaf:", `\`${newState.serverDeaf}\``, true)
                .addField("Session ID:", `||\`${newState.sessionId}\`||`, true)
                .setFooter(newState.guild.name, iconurl)
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(mod - log).send({ embeds: [embedVoiceLog] })
        } else if (newState.channelId === null) {
            const embedVoiceLog = new Discord.MessageEmbed()
                .setTitle('LOG: Kanal verlassen')
                .addField('User:', `\`${oldState.member.user.tag}\`, <@!${oldState.member.user.id}>`)
                .addField("Kanal:", `<#${oldState.channelId}>`, true)
                .addField("Muted:", `\`${oldState.selfMute}\``, true)
                .addField("Globad Muted:", `\`${oldState.serverMute}\``, true)
                .addField("Deaf:", `\`${oldState.selfDeaf}\``, true)
                .addField("Globad Deaf:", `\`${oldState.serverDeaf}\``, true)
                .addField("Kamera an:", `\`${oldState.selfVideo}\``, true)
                .addField("Stream an:", `\`${oldState.streaming}\``, true)
                .addField("Session ID:", `||\`${oldState.sessionId}\`||`, true)
                .setFooter(oldState.guild.name, iconurl)
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(mod - log).send({ embeds: [embedVoiceLog] })
        } else if (newState.channel.id !== oldState.channel.id) {
            const embedVoiceLog = new Discord.MessageEmbed()
                .setTitle('LOG: Kanal gewechselt')
                .addField('User:', `\`${newState.member.user.tag}\`, <@!${newState.member.user.id}>`)
                .addField("Kanal verlassen:", `<#${newState.channelId}>`, true)
                .addField("Kanal beigetreten:", `<#${newState.channelId}>`, true)
                .addField("Muted:", `\`${newState.selfMute}\``, true)
                .addField("Globad Muted:", `\`${newState.serverMute}\``, true)
                .addField("Deaf:", `\`${newState.selfDeaf}\``, true)
                .addField("Globad Deaf:", `\`${newState.serverDeaf}\``, true)
                .addField("Kamera an:", `\`${oldState.selfVideo}\``, true)
                .addField("Stream an:", `\`${oldState.streaming}\``, true)
                .addField("Session ID:", `||\`${newState.sessionId}\`||`, true)
                .setFooter(newState.guild.name, iconurl)
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(mod - log).send({ embeds: [embedVoiceLog] })
        } else {
            console.log("changed mute, stream or sth like that. this needs definitly to be logged, especially the executor, but since it's not that easy, i'll leave it for now")
        }


    })
}