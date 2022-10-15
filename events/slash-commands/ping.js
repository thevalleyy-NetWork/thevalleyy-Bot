const Discord = require("discord.js");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let tps = 0;
    s = Date.now();
    while (Date.now() - s <= 1) tps++;
    tps *= 1000; //:HugTomate:

    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `\`${days}\` Tage, \`${hours}\` Stunden, \`${minutes}\` Minuten und \`${seconds}\` Sekunden`;

    const iconurl = interaction.guild.iconURL();

    const prePingEmbed = new Discord.EmbedBuilder()
        .setTitle("...")
        .setColor("#36393f");
    interaction.reply({ embeds: [prePingEmbed] }).then((m) => {
        const pingEmbed = new Discord.EmbedBuilder()
            .setTitle("Bot-Info")
            .addFields([
                {
                    name: "Bot:",
                    value: `\`${(Date.now() - interaction.createdTimestamp)
                        .toString()
                        .replace("-", "")}\`ms`,
                    inline: true,
                },
                {
                    name: "API:",
                    value: `\`${Math.round(client.ws.ping)}\`ms`,
                    inline: true,
                },
                { name: "TPS:", value: `\`${tps}\``, inline: true },
                { name: "Uptime:", value: `${uptime}`, inline: true },
            ])

            .setFooter({ text: interaction.guild.name, iconURL: iconurl })
            .setTimestamp()
            .setColor("#36393f");
        interaction.editReply({ embeds: [pingEmbed] });
    });
};
