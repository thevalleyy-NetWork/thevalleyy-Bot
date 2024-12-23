const Discord = require("discord.js");
const config = require("./../config.json");
const package = require("./../package.json").dependencies;
const fs = require("fs");

const util = require("util");
const wait = require("node:timers/promises").setTimeout;

module.exports = async (client) => {
    // TODO: make use of the database
    client.db = require("./../data/database.json").db;
    client.blacklist = require("./../data/blacklist.json");

    // startup presence (now random)
    function setRandomPackageStatus() {
        const { maintenance } = JSON.parse(fs.readFileSync("./data/maintenance.json", "utf8"));
        if (maintenance == true) {
            client.user.setPresence({
                activities: [
                    {
                        name: "🛑 Wartungsmodus",
                        type: Discord.ActivityType.Playing,
                    },
                ],
                status: "dnd",
            });
        } else {
            const randomPackage = [Math.floor(Math.random() * Object.keys(package).length)];
            const potd = Object.keys(package)[randomPackage].toString();
            const votd = Object.values(package)[randomPackage].toString().replace("^", "");

            client.user.setPresence({
                activities: [{ name: `mit ${potd} v${votd}` }],
            });
        }
    }
    setRandomPackageStatus();
    setInterval(function () {
        setRandomPackageStatus();
    }, 1200000);

    // request brickset api key & userhash
    try {
        fetch("https://brickset.com/api/v3.asmx/checkKey?apikey=" + config.keys.brickset)
            .then(async (response) => response.json())
            .then((apijson) => {
                // request userhash
                fetch(
                    `https://brickset.com/api/v3.asmx/login?apikey=${config.keys.brickset}&username=${config.keys.brickset_username}&password=${config.keys.brickset_password}`
                )
                    .then(async (response) => response.json())
                    .then((userjson) => {
                        userjson.hash;

                        const json = {
                            apikey: apijson,
                            userkey: userjson,
                        };

                        client.brickset = json;

                        if (client.brickset.userkey.status == "error") {
                            client.error("Invalid brickset api key & userhash, disabling /lego command\n" + "ready.startup.js");
                        }
                    });
            });
    } catch (e) {
        client.error("Error during Api-Key validation request (brickset)\n" + e, "ready.startup.js");
    }

    // repair the sometimes broken stats json
    try {
        require("./../data/stats.json");
    } catch {
        let jsonRecover = { discord: { buttonKlicks: 0 } };

        fs.writeFile("./data/stats.json", JSON.stringify(jsonRecover, null, 4), (err) => {
            client.error(err, "startup.json");
        });
    }
};
