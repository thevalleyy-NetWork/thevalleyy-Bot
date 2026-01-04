import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.rotateText;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;
    const text = interaction.options.getString("text");

    const charMap = {
        a: "ɐ",
        b: "q",
        c: "ɔ",
        d: "p",
        e: "ǝ",
        f: "ɟ",
        g: "ƃ",
        h: "ɥ",
        i: "ᴉ",
        j: "ɾ",
        k: "ʞ",
        l: "ן",
        m: "ɯ",
        n: "u",
        p: "d",
        q: "b",
        r: "ɹ",
        t: "ʇ",
        u: "n",
        v: "ʌ",
        w: "ʍ",
        y: "ʎ",
        A: "∀",
        B: "𐐒",
        C: "Ɔ",
        D: "ᗡ",
        E: "Ǝ",
        F: "Ⅎ",
        G: "פ",
        J: "ſ",
        K: "ʞ",
        L: "˥",
        M: "W",
        P: "Ԁ",
        T: "┴",
        U: "∩",
        V: "Λ",
        W: "M",
        Y: "⅄",
        1: "Ɩ",
        2: "ᄅ",
        3: "Ɛ",
        4: "ㄣ",
        5: "ϛ",
        6: "9",
        7: "ㄥ",
        8: "8",
        9: "6",
        0: "0",
        "!": "¡",
        "?": "¿",
        ".": "˙",
        ",": "'",
        "'": ",",
        '"': ",,",
        "(": ")",
        ")": "(",
        "[": "]",
        "]": "[",
        "{": "}",
        "}": "{",
        "<": ">",
        ">": "<",
        "&": "⅋",
        _: "‾",
    };

    const rotatedText = text
        .split("")
        .map((char) => charMap[char] || char)
        .reverse()
        .join("");

    interaction.reply(rotatedText.substring(0, 2000));
};
