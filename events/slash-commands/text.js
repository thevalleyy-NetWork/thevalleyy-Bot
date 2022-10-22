module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const textthatishouldsay = interaction.options.getString("text");

    interaction.reply({ content: "Done", ephemeral: true });
    interaction.channel.send({
        content: textthatishouldsay.substring(0, 2000),
        allowedMentions: { parse: [] },
    });
};
