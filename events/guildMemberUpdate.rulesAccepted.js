import config from "../config.json" with { type: "json" };

export default async (client, oldMember, newMember) => {
    if (newMember.guild.id != config.guild) return;
    try {
        if (oldMember.pending === newMember.pending) return;
        if (newMember.pending === false) {
            const niceone = newMember.guild.roles.cache.find((role) => role.name === "Nice One").id; // TODO: change to config
            const mitglied = newMember.guild.roles.cache.find((role) => role.name === "Mitglied").id;
            
            const user = newMember.guild.members.cache.get(newMember.user.id);
             user.roles.add(mitglied);

            //TODO: testfor niceone
            //TODO: test this code
            
            client.channels.cache
                .get(config.channels.modlogchannel)
                .send("Serverregeln akzeptiert: <@" + newMember.user.id + ">, `" + newMember.user.id + "`\nHat Nice One bekommen: Ja");

            user.roles.add(niceone);
        }
    } catch (error) {
        client.error(error, "rulesAccepted.js");
    }
};
