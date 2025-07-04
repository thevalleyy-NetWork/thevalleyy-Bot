import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.bettereval;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    client.log(`Evaluating code: ${interaction.options.getString("code")} (${interaction.user.tag})`, "bettereval.js");

    let m;
    let exited;
    let tooLong = false;
    const getLines = (d) => d.split(/(\r?\n)+/).join("");

    if (interaction.user) {
        await interaction.reply("```xl\n" + interaction.options.getString("code") + "\n```");
        m = await interaction.fetchReply();
    } else m = await interaction.reply("```xl\n" + interaction.options.getString("code") + "\n```");

    const update = () => {
        if (tooLong) return;
        const text = interaction.options.getString("code") + "\n\n" + getLines(data.join("")).replaceAll("```", "``​`") + "\n" + (exited ? exited : "");
        if (interaction.user)
            interaction.editReply("```xl\n" + text.substring(0, 1990).trim() + (text.length > 1989 ? "\n..." : "") + "\n" + "```").catch(() => {});
        else m.edit("```xl\n" + text.substring(0, 1990).trim() + (text.length > 1989 ? "\n..." : "") + "\n" + "```").catch(() => {});
        if (text.length > 2000) tooLong = true;
        // if (text.length > 2000) kill.push(true); 
    };

    const { spawn } = await import("child_process");
    const child = spawn(interaction.options.getString("code"), {
        shell: true,
    });
    let data = [];
    const handler = (d) => {
        data.push(d.toString());
        update();
    };

    child.stdout.on("data", handler);
    child.stderr.on("data", handler);
    child.stdout.on("error", handler);
    child.stderr.on("error", handler);
    child.on("error", handler);

    child.on("exit", (code, signal) => {
        let d = l10n.exitCode[locale] + " ";

        function string(t) {
            return (d += t.toString());
        }

        if (signal == null) {
            exited = string(code);
            update();
        } else {
            exited = string(signal);
            update();
        }
    }); //TODO: antwort knopf, kill knopf, pagination?
};
