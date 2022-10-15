const config = require("../config.json");
const modlog = config.mod_log_channel_id;
const channelId = config.channels.memberchannel;

module.exports = async (client, member) => {
    const updateMembers = async (guild = member.guild) => {
        var memberCount = await guild.members.cache.filter(
            (member) => !member.user.bot
        ).size;
        const channel = guild.channels.cache.get(channelId);
        channel.setName(
            `Mitglieder: ${memberCount.toLocaleString()}`,
            "updating membercount"
        );
    };

    try {
        updateMembers(member.guild);
    } catch (error) {
        client.error(error, "memberCount.js");
    }
};
