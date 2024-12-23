const { ChannelType } = require("discord.js");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async (client, message) => {
    if (message.channel.type !== ChannelType.DM) return;
    if (message.author.id == "506746108345843713") return;
    if (message.author.bot) return;

    try {
        message.client.users.fetch("506746108345843713", false).then((user) => {
            const embedDM = new Discord.EmbedBuilder()
                .setTitle("Direct Message <:hm:907936051300012072>")
                .setThumbnail(message.author.avatarURL())
                .addFields([
                    {
                        name: "`" + message.author.tag + "`:",
                        value: message.content.substring(0, 1000),
                    },
                ])
                .setFooter({
                    text: "Meine DMs, " + message.author.username + "s ID: " + message.author.id,
                })
                .setTimestamp()
                .setColor("#b51cbd");

            user.send({ embeds: [embedDM] });
            message.react("<:checkmarkEmbed:1005146896278503597> ");
        });
    } catch (error) {
        client.error(error, "dm.js");
    }
};
