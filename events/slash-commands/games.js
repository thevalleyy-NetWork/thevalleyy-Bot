module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    interaction.reply("Soon");
};
