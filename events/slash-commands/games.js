export default (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    interaction.reply("Soon");
};
