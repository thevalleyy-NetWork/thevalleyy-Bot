import config from "../config.json" with { type: "json" };

export default async (client, member) => {
    // TODO: test this
    if (member.guild.id != config.guild) return;

    const updateMembers = async (guild = member.guild) => {
        const memberCount = await guild.members.cache.filter((member) => !member.user.bot).size;
        const channel = guild.channels.cache.get(config.channels.memberchannel);
        channel.setName(`Mitglieder: ${memberCount.toLocaleString()}`, "updating membercount");
    };

    try {
        updateMembers(member.guild);
    } catch (error) {
        client.error(error, "memberCount.js");
    }
};
