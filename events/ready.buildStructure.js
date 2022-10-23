const fs = require("fs");

module.exports = (client) => {
    const cmdJson = client.cmdStructure;
    let array = [];

    Object.keys(cmdJson.cmds).forEach((command) => {
        const name = cmdJson.cmds[command].data.name;
        array.push(name.toLowerCase());

        client.cmdlist = array;
    });
};
