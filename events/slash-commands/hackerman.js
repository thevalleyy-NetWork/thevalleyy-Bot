module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const hackertext2 = interaction.options
        .getString("text")
        .replaceAll("sus", "<:SUS:843876559941402654>")
        .replaceAll("leet", "1337")
        .replaceAll("a", "4")
        .replaceAll("i", "1")
        .replaceAll("e", "3")
        .replaceAll("a", "@")
        .replaceAll("1337", "LEET")
        .replaceAll("i", "|")
        .replaceAll("s", "5")
        .replaceAll("s", "2")
        .replaceAll("o", "0")
        .replaceAll("n", "|/|")
        .replaceAll("d", "|)")
        .replaceAll("m", "||/|")
        .replaceAll("g", "q")
        .replaceAll("l", "|_")
        .replaceAll("t", "']['")
        .replaceAll("b", "|>")
        .replaceAll("c", "<")
        .substring(0, 300);

    interaction.reply({ content: "Done", ephemeral: true });
    interaction.channel.send({
        content: hackertext2,
        allowedMentions: { parse: [] },
    });
};
