const config = require("./../config.json");

const modlog = config.mod_log_channel_id;
const channelId = config.channels.welcomechannel;
const muterole = "692016581823168632";
const vcmuterole = "685814796746358838"; // TODO: change to config

module.exports = async (client, member) => {
    if (member.guild.id != "631518992342843392") return;

    // TODO: change to json db
    // was the user here before?
    // try {
    //     if (
    //         await db(`SELECT dcid FROM discord WHERE dcid = ${member.id}`).then(
    //             (res) => res[0]
    //         )
    //     ) {
    //         try {
    //             const res = await db(
    //                 `SELECT * FROM discord WHERE dcid = ${member.id}`
    //             );
    //             const user = res[0];

    //             if (user.muted == 1) {
    //                 member.roles.add(muterole);
    //                 member.user.send("Denkste");
    //             }
    //             if (user.voicemuted == 1) {
    //                 member.roles.add(vcmuterole);
    //             }
    //             if ((await decodeURI(user.dctag)) !== member.user.tag) {
    //                 await db(`UPDATE discord SET dctag = ? WHERE dcid = ?`, [
    //                     member.user.tag.replaceAll("'", " "),
    //                     member.id,
    //                 ]);
    //             }
    //             await db(
    //                 `UPDATE discord SET joindate = ${Date.now()} WHERE dcid = ${
    //                     member.id
    //                 }`
    //             );
    //         } catch (e) {
    //             client.error(e, "welcome.js");
    //         }
    //     } else {
    //         // insert into db
    //         try {
    //             await db(
    //                 `INSERT INTO discord (dcid, dctag, joindate, oldestjoindate) VALUES (${
    //                     member.id
    //                 }, '${member.user.tag.replaceAll(
    //                     "'",
    //                     " "
    //                 )}', ${Date.now()}, ${Date.now()})`
    //             );
    //         } catch (e) {
    //             client.error(e, "welcome.js");
    //         }
    //     }

    const message = `Herzlich Willkommen, <@${member.id}> auf dem **thevalleyy-NetWork**. \nLies dir noch das <#786239847554875402> durch, dann kannst du loslegen! :D`;
    const channel = member.guild.channels.cache.get(channelId);
    channel.send(message).then((message) => {
        setTimeout(() => message.react("a:PeepoHey:844822512495755264"), 50);
    });
    // } catch (err) {
    //     client.error(err, "welcome.js");
    // }
};
