module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const num1 = +interaction.options.get("number1").value;
    const num2 = +interaction.options.get("number2").value;

    if (Number.isNaN(num1 + num2)) {
        interaction.reply("Das Ergebnis ist nicht numerisch");
    } else {
        interaction.reply("Die Summe ist: `" + `${num1 + num2}` + "`");
    }
};
