const Discord = require("discord.js");
const config = require("../../config.json");
const package = require("../../package.json");

export default (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let array = [];
    for (let i = 0; i < Object.keys(package.dependencies).length; i++) {
        array.push(Object.keys(package.dependencies)[i] + ": v" + Object.values(package.dependencies)[i].replace("^", ""));
    }

    const embed = new Discord.EmbedBuilder()
        .setColor(config.standard_color)
        .setTitle(package.name + " v" + package.version)
        .setDescription("Packages:\n" + `\`\`\`${array.join(", ").replaceAll(", ", ",\n")}\`\`\``)
        .setThumbnail(client.user.avatarURL())
        .addFields([
            {
                name: "Start-Datei",
                value: "`" + package.main + "`",
                inline: true,
            },
            {
                name: "Description",
                value: "`" + package.description + "`",
                inline: true,
            },
        ]);

    interaction.reply({ embeds: [embed] });
};
