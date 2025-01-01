import { ActivityType} from "discord.js";
import config from "./../config.json" with { type: "json" };
import packageJson from "./../package.json" with { type: "json" };
import fs from "fs";

const pck = packageJson.dependencies;

export default async (client) => {
    const loadBlacklist = () => {
        const blacklistModule = JSON.parse(fs.readFileSync('./data/blacklist.json', 'utf8'));
        client.blacklist = blacklistModule;
    };

    loadBlacklist();
    fs.watchFile('./data/blacklist.json', (curr, prev) => {
        loadBlacklist();
    });

    // startup presence (now random)
    function setRandompckStatus() {
        const { maintenance } = JSON.parse(fs.readFileSync("./data/maintenance.json", "utf8"));
        if (maintenance == true) {
            client.user.setPresence({
                activities: [
                    {
                        name: "🛑 Wartungsmodus",
                        type: ActivityType.Playing,
                    },
                ],
                status: "dnd",
            });
        } else {
            const randompck = [Math.floor(Math.random() * Object.keys(pck).length)];
            const potd = Object.keys(pck)[randompck].toString();
            const votd = Object.values(pck)[randompck].toString().replace("^", "");

            client.user.setPresence({
                activities: [{ name: `mit ${potd} v${votd}` }],
            });
        }
    }
    setRandompckStatus();
    setInterval(function () {
        setRandompckStatus();
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
        client.error("Error during api key validation request (brickset)\n" + e, "ready.startup.js");
    }

    // repair the sometimes broken stats json
    try {
        await import("./../data/stats.json", { with: { type: 'json' } });
    } catch {
        let jsonRecover = { discord: { buttonKlicks: 0 } };

        fs.writeFile("./data/stats.json", JSON.stringify(jsonRecover, null, 4), (err) => {
            client.error(err, "startup.js");
        });
    }
};
