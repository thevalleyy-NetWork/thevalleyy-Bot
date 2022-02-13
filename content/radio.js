const discordVoice = require('@discordjs/voice');
module.exports = async(client) => {
    try {
        const player = discordVoice.createAudioPlayer();
        const resource = discordVoice.createAudioResource('https://streams.ilovemusic.de/iloveradio5.mp3');

        const connection = discordVoice.joinVoiceChannel({
            channelId: "786272345689161758",
            guildId: "631518992342843392",
            adapterCreator: client.guilds.cache.get("631518992342843392").voiceAdapterCreator
        });

        player.play(resource);
        connection.subscribe(player);
    } catch (error) {
        const embedError = new Discord.MessageEmbed()
            .setTitle('Fehler beim Abspielen von Medien in einem Voicechannel')
            .setThumbnail('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab0c1e57515093.59d8c6eb16d19.gif')
            .setDescription('Fehler: `' + error + '`')
            .setFooter('thevalleyy-NetWork', iconurl)
            .setTimestamp()
            .setColor('fc036b')
        client.channels.cache.get(botlog).send({ embeds: [embedError] })
    }
}