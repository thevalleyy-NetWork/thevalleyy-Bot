const modlog = '822575095721099304'
const Discord = require('discord.js')
const discordVoice = require('@discordjs/voice');

module.exports = async(client, oldState, newState) => {
        
        if (oldState.member.user.bot) return
        if (oldState.guild.id != '631518992342843392') return
        const iconurl = client.guilds.cache.get(oldState.guild.id).iconURL()


        if (oldState.channelId === null) {
            const embedVoiceLog = new Discord.EmbedBuilder()
                .setTitle('LOG: Kanal betreten')
                .addFields([
                    { name: 'User', value: `\`${oldState.member.user.tag}\`, <@!${oldState.member.user.id}>` },
                    { name: "Kanal: ", value: `<#${newState.channelId}>`, inline: true },
                    { name: "Session-ID:", value: `||\`${newState.sessionId}\`||`, inline: true}
                ])
                .setFooter({ text: newState.guild.name, iconURL: iconurl })
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(modlog).send({ embeds: [embedVoiceLog] })
        } else if (newState.channelId === null) {
            const embedVoiceLog = new Discord.EmbedBuilder()
                .setTitle('LOG: Kanal verlassen')
                .addFields([
                    { name: 'User', value: `\`${oldState.member.user.tag}\`, <@!${oldState.member.user.id}>` },
                    { name: "Kanal: ", value: `<#${oldState.channelId}>` },
                    { name: "Session-ID:", value: `||\`${oldState.sessionId}\`||`, inline: true}
                ])
                .setFooter({ text: oldState.guild.name, iconURL: iconurl })
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(modlog).send({ embeds: [embedVoiceLog] })
        } else if (newState.channel.id !== oldState.channel.id) {
            const embedVoiceLog = new Discord.EmbedBuilder()
                .setTitle('LOG: Kanal gewechselt')
                .addFields([
                    { name: 'User', value: `\`${newState.member.user.tag}\`, <@!${newState.member.user.id}>` },
                    { name: "Kanal verlassen:", value: `<#${oldState.channelId}>`, inline: true },
                    { name: "Kanal betreten:", value: `<#${newState.channelId}>`, inline: true},
                    { name: "Session-ID:", value: `||\`${newState.sessionId}\`||`, inline: true}
                ])    
                .setFooter({ text: newState.guild.name, iconURL: iconurl })
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(modlog).send({ embeds: [embedVoiceLog] })
        } else {
            //TODO: changed mute, stream or sth like that. this needs definitly to be logged, especially the executor, but since it's not that easy, i'll leave it for now
        }
}