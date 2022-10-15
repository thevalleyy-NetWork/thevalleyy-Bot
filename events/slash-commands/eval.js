const config = require("../../config.json");
const util = require("util");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.user.id != config.owner) {
        interaction.reply({
            content: "Du hast keine Berechtigung, diesen Befehl auszuführen.",
            ephemeral: true,
        });
        return;
    }

    const evalcode = interaction.options.getString("code");

    if (evalcode.toString().toLowerCase().includes("client.token")) {
        interaction.reply("<:hm:907936051300012072>");
        return;
    }
    try {
        client.log(`Evaluating code: ${evalcode}`, "eval.js");
        const result = await eval(evalcode);
        let output = result;
        if (typeof result !== "string") {
            output = util.inspect(result);
        }

        if (output.toLowerCase().includes(client.token.toLowerCase())) {
            interaction.reply("<:hm:907936051300012072>");
            return;
        }

        interaction.reply("```js\n" + output.substring(0, 1950) + "```");
        console.log(
            "\n-----EVAL BEGIN-----\n" + output + "\n------EVAL END------\n"
        );
    } catch (error) {
        client.error(error, "eval.js");
        interaction.reply("Es ist ein Fehler aufgetreten.");
    }
};
