import config from "../../config.json" with { type: "json" };
import util from "util";
import paginationEmbed from "../../functions/pagination.js";
import { ButtonBuilder, EmbedBuilder, MessageFlagsBitField } from "discord.js";

// these imports make it easier to reference functions from /eval
import Discord from "discord.js";

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
    const ephemeral = interaction.options.getBoolean("ephemeral") || false;

    // TODO: better protection
    if (evalcode.toString().toLowerCase().includes("client.token")) {
        includesToken();
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
            includesToken();
            return;
        }

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
        paginationEmbed(interaction, pages, buttonList, 300000, ephemeral);

        // if (output != undefined) console.log("\n-----EVAL BEGIN-----\n" + output + "\n------EVAL END------\n");
    } catch (error) {
        const embed = new EmbedBuilder()
            .setTitle(l10n.embed.title[locale])
            .setDescription("```js\n" + error.toString().substring(0, 4000) + "```")
            .setColor(config.colors.error)
            .setTimestamp();
        interaction.reply({
            embeds: [embed],
            flags: ephemeral ? MessageFlagsBitField.Flags.Ephemeral : [],
        });
    }

    function includesToken() {
        const embed = new EmbedBuilder().setTitle(l10n.tokenInOutput[locale]).setColor(config.colors.error);
        interaction.reply({
            embeds: [embed],
            flags: ephemeral ? MessageFlagsBitField.Flags.Ephemeral : [],
        });
    }
};
