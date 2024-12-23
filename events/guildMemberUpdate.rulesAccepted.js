const modlog = "822575095721099304";
const config = require("./../config.json");

module.exports = async (client, oldMember, newMember) => {
    const iconurl = newMember.guild.iconURL();
    try {
        if (oldMember.pending === newMember.pending) return;
        if (newMember.pending === false) {
            const niceone = newMember.guild.roles.cache.find((role) => role.name === "Nice One").id;
            const mitglied = newMember.guild.roles.cache.find((role) => role.name === "Mitglied").id;
            const user = newMember.guild.members.cache.get(newMember.user.id);

            user.roles.add(mitglied);

            //TODO: make use of the database
            // if (await db(`SELECT dcid FROM discord WHERE niceone != 1 AND dcid = ${newMember.user.id}`).then((res) => res[0]))
            //     return client.channels.cache
            //         .get(modlog)
            //         .send("Serverregeln akzeptiert: <@" + newMember.user.id + ">, `" + newMember.user.id + "`\nHat Nice One bekommen: Nein");
            // client.channels.cache
            //     .get(modlog)
            //     .send("Serverregeln akzeptiert: <@" + newMember.user.id + ">, `" + newMember.user.id + "`\nHat Nice One bekommen: Ja");

            user.roles.add(niceone);
        }
    } catch (error) {
        client.error(error, "rulesAccepted.js");
    }
};
