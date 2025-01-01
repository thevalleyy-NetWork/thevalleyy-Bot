import { spawn } from "child_process";
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.restart;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    (function main() {
        if (process.env.process_restarting) {
            delete process.env.process_restarting;
            // Give old process one second to shut down before continuing ...
            setTimeout(main, 1000);
            return;
        }

        // Restart process ...
        spawn(process.argv[0], process.argv.slice(1), {
            env: { process_restarting: 1 },
            stdio: "ignore",
            detached: true,
        }).unref();
    })();

    process.exit(1);
};
