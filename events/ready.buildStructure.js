export default (client) => {
    const { cmds } = client;
    let array = [];

    Object.keys(cmds).forEach((command) => {
        const name = cmds[command].data.name;
        array.push(name.toLowerCase());

        client.cmdlist = array;
    });
};
