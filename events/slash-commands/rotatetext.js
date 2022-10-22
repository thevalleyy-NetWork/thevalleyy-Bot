module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const text = interaction.options.getString("text");

    // const rotatedText = text.replace(/[a-z]/gi, (c) => {
    //     return String.fromCharCode(
    //         c.charCodeAt(0) + (c.toLowerCase() <= "m" ? 13 : -13)
    //     );
    // });

    const rotatedText = text
        .replaceAll("a", "ɐ")
        .replaceAll("b", "q")
        .replaceAll("c", "ɔ")
        .replaceAll("d", "p")
        .replaceAll("e", "ǝ")
        .replaceAll("f", "ɟ")
        .replaceAll("g", "ƃ")
        .replaceAll("h", "ɥ")
        .replaceAll("i", "ᴉ")
        .replaceAll("j", "ɾ")
        .replaceAll("k", "ʞ")
        .replaceAll("l", "ן")
        .replaceAll("m", "ɯ")
        .replaceAll("n", "u")
        .replaceAll("p", "d")
        .replaceAll("q", "b")
        .replaceAll("r", "ɹ")
        .replaceAll("t", "ʇ")
        .replaceAll("u", "n")
        .replaceAll("v", "ʌ")
        .replaceAll("w", "ʍ")
        .replaceAll("y", "ʎ")
        .replaceAll("A", "∀")
        .replaceAll("B", "𐐒")
        .replaceAll("C", "Ɔ")
        .replaceAll("D", "ᗡ")
        .replaceAll("E", "Ǝ")
        .replaceAll("F", "Ⅎ")
        .replaceAll("G", "פ")
        .replaceAll("J", "ſ")
        .replaceAll("K", "ʞ")
        .replaceAll("L", "˥")
        .replaceAll("M", "W")
        .replaceAll("P", "Ԁ")
        .replaceAll("T", "┴")
        .replaceAll("U", "∩")
        .replaceAll("V", "Λ")
        .replaceAll("W", "M")
        .replaceAll("Y", "⅄")
        .replaceAll("1", "Ɩ")
        .replaceAll("2", "ᄅ")
        .replaceAll("3", "Ɛ")
        .replaceAll("4", "ㄣ")
        .replaceAll("5", "ϛ")
        .replaceAll("6", "9")
        .replaceAll("7", "ㄥ")
        .replaceAll("8", "8")
        .replaceAll("9", "6")
        .replaceAll("0", "0")
        .replaceAll("!", "¡")
        .replaceAll("?", "¿")
        .replaceAll(".", "˙")
        .replaceAll(",", "'")
        .replaceAll("'", ",")
        .replaceAll('"', ",,")
        .replaceAll("(", ")")
        .replaceAll(")", "(")
        .replaceAll("[", "]")
        .replaceAll("]", "[")
        .replaceAll("{", "}")
        .replaceAll("}", "{")
        .replaceAll("<", ">")
        .replaceAll(">", "<")
        .replaceAll("&", "⅋")
        .replaceAll("_", "‾");

    const flipped = rotatedText.split("").reverse().join("");

    interaction.reply(flipped.substring(0, 2000));
};
