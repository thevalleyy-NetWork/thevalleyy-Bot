const modlog = '822575095721099304'
const Discord = require('discord.js')
const discordVoice = require('@discordjs/voice');

module.exports = async(client) => {
    const connection = discordVoice.joinVoiceChannel({
        channelId: "786272345689161758",
        guildId: "631518992342843392",
        adapterCreator: client.guilds.cache.get("631518992342843392").voiceAdapterCreator
    });
    const player = discordVoice.createAudioPlayer();
    connection.subscribe(player);

    const guild = client.guilds.cache.get("631518992342843392");
    guild.me.voice.setMute(true, "startup mute state");


    function musikAn(stream, guildId, channelId) {
        try {
            const connection = discordVoice.joinVoiceChannel({
                channelId: "786272345689161758",
                guildId: "631518992342843392",
                adapterCreator: client.guilds.cache.get("631518992342843392").voiceAdapterCreator
            });
            const player = discordVoice.createAudioPlayer();
            connection.subscribe(player);
            const resource = discordVoice.createAudioResource(stream);
            player.play(resource);

            const guild = client.guilds.cache.get(guildId);
            guild.me.voice.setMute(false, "somebody joined");
        } catch (error) {
            console.log(error)
        }
    }

    function musikAus(muteState = true, guildId) {
        try {
            const player = discordVoice.createAudioPlayer();
            player.stop()
            if (muteState == false) return
            const guild = client.guilds.cache.get(guildId);
            guild.me.voice.setMute(true, "empty radio channel")
        } catch (error) {
            console.log(error)
        }
    }


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
                .addField("Session ID:", `||\`${newState.sessionId}\`||`, true)
                .setFooter({ text: newState.guild.name, iconURL: iconurl })
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(modlog).send({ embeds: [embedVoiceLog] })

            if (newState.channelId == 786272345689161758) {
                musikAn("https://streams.ilovemusic.de/iloveradio5.mp3", "631518992342843392", "786272345689161758")
            }


        } else if (newState.channelId === null) {
            const embedVoiceLog = new Discord.MessageEmbed()
                .setTitle('LOG: Kanal verlassen')
                .addField('User:', `\`${oldState.member.user.tag}\`, <@!${oldState.member.user.id}>`)
                .addField("Kanal:", `<#${oldState.channelId}>`, true)
                .addField("Session ID:", `||\`${oldState.sessionId}\`||`, true)
                .setFooter({ text: oldState.guild.name, iconURL: iconurl })
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(modlog).send({ embeds: [embedVoiceLog] })

            if (oldState.channelId == 786272345689161758 && client.channels.cache.get(oldState.channelId).members.size - 1 == 0) {
                musikAus(true, "631518992342843392")
            }


        } else if (newState.channel.id !== oldState.channel.id) {
            const embedVoiceLog = new Discord.MessageEmbed()
                .setTitle('LOG: Kanal gewechselt')
                .addField('User:', `\`${newState.member.user.tag}\`, <@!${newState.member.user.id}>`)
                .addField("Kanal verlassen:", `<#${oldState.channelId}>`, true)
                .addField("Kanal beigetreten:", `<#${newState.channelId}>`, true)
                .addField("Session ID:", `||\`${newState.sessionId}\`||`, true)
                .setFooter({ text: newState.guild.name, iconURL: iconurl })
                .setTimestamp()
                .setColor('#24E498')

            client.channels.cache.get(modlog).send({ embeds: [embedVoiceLog] })

            if (newState.channelId == 786272345689161758) {
                musikAn("https://streams.ilovemusic.de/iloveradio5.mp3", "631518992342843392", "786272345689161758")
            }

            if (oldState.channelId == 786272345689161758 && client.channels.cache.get(oldState.channelId).members.size - 1 == 0) {
                musikAus(true, "631518992342843392")
            }


        } else {
            // changed mute, stream or sth like that. this needs definitly to be logged, especially the executor, but since it's not that easy, i'll leave it for now
        }


    })
}