import updateMembers from "./guildMemberAdd.memberCount.js";

export default async (client, member) => {
    try {
        updateMembers(client, member);
    } catch (error) {
        client.error(error, "memberCount.js");
    }
};
