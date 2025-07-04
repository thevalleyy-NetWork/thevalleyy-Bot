import config from "../../config.json" with { type: "json" };
import util from "util";
import paginationEmbed from "../../functions/pagination.js";
import { ButtonBuilder, EmbedBuilder } from "discord.js";

import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.eval;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const evalcode = interaction.options.getString("code");

    if (evalcode.toString().toLowerCase().includes("client.token")) { // TODO: better protection
        interaction.reply(l10n.tokenInRequest[locale]);
        return;
    }

    try {
        client.log(`Evaluating code: ${evalcode} (${interaction.user.tag})`, "eval.js");
        const result = await eval(evalcode);
        let output = result;

        if (result instanceof Promise) {
            output = await result;
        }

        if (typeof result !== "string") {
            output = util.inspect(result);
        }

        if (output.toLowerCase().includes(client.token.toLowerCase())) {
            interaction.reply(l10n.tokenInOutput[locale]);
            return;
        }

        if (output.length < 1990) {
            interaction.reply("```js\n" + output + "```");
        } else {
            const button1 = new ButtonBuilder().setCustomId("previousbtn").setLabel("◀️").setStyle("Secondary");
            const button2 = new ButtonBuilder().setCustomId("nextbtn").setLabel("▶️").setStyle("Secondary");

            const buttonList = [button1, button2];

            const pages = [];
            for (let i = 0; i < output.length; i += 4000) {
                const page = new EmbedBuilder()
                    .setTitle(l10n.embed.title[locale])
                    .setDescription("```js\n" + output.substring(i, i + 4000) + "```")
                    .setColor(config.colors.default)
                    .setTimestamp();
                pages.push(page);
            }
            paginationEmbed(interaction, pages, buttonList);
        }

        // if (output != undefined) console.log("\n-----EVAL BEGIN-----\n" + output + "\n------EVAL END------\n");
    } catch (error) {
        interaction.reply("```js\n" + error + "```");
    }
};
