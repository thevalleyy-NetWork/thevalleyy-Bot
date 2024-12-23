import { ChannelType, EmbedBuilder } from "discord.js";
import config from "../config.json" with { type: "json" };

export default async (client, message) => {
    if (message.channel.type !== ChannelType.DM) return;
    if (message.author.id == config.owner) return;
    if (message.author.bot) return;

    try { //TODO: test this
        message.client.users.fetch(config.owner, false).then((user) => {
            const embed = new EmbedBuilder()
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
                .setColor(config.colors.magenta);

            user.send({ embeds: [embed] });
            message.react("<:checkmarkEmbed:1005146896278503597> ");
        });
    } catch (error) {
        client.error(error, "dm.js");
    }
};
