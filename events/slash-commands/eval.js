const config = require("../../config.json");
const util = require("util");
const Discord = require("discord.js");
const paginationEmbed = require("../../functions/pagination.js");

export default async (client, interaction) => {
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

        if (output.length < 2000) {
            interaction.reply("```js\n" + output + "```");
        } else {
            const button1 = new Discord.ButtonBuilder().setCustomId("previousbtn").setLabel("◀️").setStyle("Secondary");

            const button2 = new Discord.ButtonBuilder().setCustomId("nextbtn").setLabel("▶️").setStyle("Secondary");

            buttonList = [button1, button2];

            const pages = [];
            for (let i = 0; i < output.length; i += 4000) {
                const page = new Discord.EmbedBuilder()
                    .setTitle("Eval")
                    .setDescription("```js\n" + output.substring(i, i + 4000) + "```")
                    .setColor(config.standard_color)
                    .setTimestamp();
                pages.push(page);
            }
            paginationEmbed(interaction, pages, buttonList);
        }

        if (output != undefined) console.log("\n-----EVAL BEGIN-----\n" + output + "\n------EVAL END------\n");
    } catch (error) {
        interaction.reply("```js\n" + error + "```");
    }
};
