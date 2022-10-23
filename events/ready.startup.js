const Discord = require("discord.js");
const config = require("./../config.json");
const package = require("./../package.json").dependencies;
const fs = require("fs");

const mysql = require("mysql2");
const util = require("util");
const wait = require("node:timers/promises").setTimeout;
const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});
const db = util.promisify(connection.query).bind(connection);

module.exports = async (client) => {
    // write database to file
    try {
        await db("SELECT * FROM discord").then(async (res) => {
            const dbJson = {
                date: Date.now(),
                db: res,
            };
            await fs.writeFileSync(
                "./data/database.json",
                JSON.stringify(dbJson, null, 4)
            );
            client.db = await res;

            const blacklist = await res
                .filter((x) => x.blacklisted == 1)
                .map((x) => x.dcid);
            client.blacklist = blacklist;

            await fs.writeFileSync(
                "./data/blacklist.json",
                JSON.stringify(client.blacklist, null, 4)
            );
        });
    } catch (e) {
        client.error(
            "Retrieved error while caching db, using local copy\n" + e,
            "ready.startup.js"
        );
        // use old database
        client.db = require("./../data/database.json").db;
        client.blacklist = require("./../data/blacklist.json");
    }

    // startup presence (now random)
    function setRandomPackageStatus() {
        const { maintenance } = JSON.parse(
            fs.readFileSync("./data/maintenance.json", "utf8")
        );
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
            const randomPackage = [
                Math.floor(Math.random() * Object.keys(package).length),
            ];
            const potd = Object.keys(package)[randomPackage].toString();
            const votd = Object.values(package)
                [randomPackage].toString()
                .replace("^", "");

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
        fetch(
            "https://brickset.com/api/v3.asmx/checkKey?apikey=" +
                config.keys.brickset
        )
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
                            client.error(
                                "Invalid brickset api key & userhash, disabling /lego command\n" +
                                    "ready.startup.js"
                            );
                        }
                    });
            });
    } catch (e) {
        client.error(
            "Error during Api-Key validation request (brickset)\n" + e,
            "ready.startup.js"
        );
    }

    // repair the sometimes broken stats json
    try {
        require("./../data/stats.json");
    } catch {
        let jsonRecover = { discord: { buttonKlicks: 0 } };

        fs.writeFile(
            "./data/stats.json",
            JSON.stringify(jsonRecover, null, 4),
            (err) => {
                client.error(err, "startup.json");
            }
        );
    }
};
