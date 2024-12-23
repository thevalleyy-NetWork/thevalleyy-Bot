import { ChannelType } from "discord.js";

export default (client, message) => {
    if (message.author.bot || message.guild === null || message.channel.type == ChannelType.DM) return;

    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
        message.reply(
            `Hallo \`${message.author.username}\`, ich nutze **Slash-Commands**! <:POGGIES:786251968841515049>\nFür Hilfe nutze </help about:1320738378156867642>`
        ); //TODO: remove hardcoded ID
    }
};
