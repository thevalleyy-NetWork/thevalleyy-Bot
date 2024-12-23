import config from "../config.json" with { type: "json" };
const muterole = "692016581823168632";
const vcmuterole = "685814796746358838"; // TODO: change to config

export default async (client, member) => {
    if (member.guild.id != config.guild) return;
    try {
        // TODO: change to json db
        // was the user here before?
        // update the newest join date
        // has the user been muted permanentely before?
        // has he the nice one role?

        // TODO: test if this works
        const message = `Herzlich Willkommen, <@${member.id}> auf dem **${member.guild.name}**. \nLies dir noch das <#${config.channels.ruleschannel}> durch, dann kannst du loslegen!`;
        const channel = member.guild.channels.cache.get(config.channels.welcomechannel);
        channel.send(message).then((message) => {
            setTimeout(() => message.react("a:PeepoHey:844822512495755264"), 50);
        });
    } catch (err) {
        client.error(err, "welcome.js");
    }
};
