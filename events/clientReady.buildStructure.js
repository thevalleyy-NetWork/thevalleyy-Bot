import localization from "../localization.json" with { type: "json" };
const l10n = localization.events.clientReady.buildStructure;

/**
 * @param {import("discord.js").Client} client
 */
export default (client) => {
    const { cmds } = client;
    let array = [];

    Object.keys(cmds).forEach((command) => {
        const name = cmds[command].data.name;
        array.push(name.toLowerCase());

        client.cmdlist = array;
    });
};
