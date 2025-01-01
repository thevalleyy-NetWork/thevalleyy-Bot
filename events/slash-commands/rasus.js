import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.rasus

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;
    const user = interaction.options.getUser("user");

    const rusasarray = [
        "ruuuuuuuuusas",
        "raaaaaaaaasus",
        "RUSSUS",
        "RUAS",
        "RUUUUUUUUUUUUUUUUUSAS",
        "RAAAAAAAAAAAAAASUS",
        "ach rusas",
        "RASUS du Kek :flushed:",
        "rinsas <:troll:800321754873987112>",
        "susar!",
    ];

    const rusas = rusasarray[Math.floor(Math.random() * rusasarray.length)];
    interaction.channel.send(rusas + (user ? ` <@${user.id}>` : ""));
    interaction.reply({ content: "😳", ephemeral: true });
};
