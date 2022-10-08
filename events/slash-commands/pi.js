const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();

    if (!interaction.options.getBoolean("hexadecimal")) {
        var base = 10;
    } else {
        var base = 16;
    }

    if (!interaction.options.getNumber("digits")) {
        var digits = 16;
    } else {
        var digits = interaction.options.getNumber("digits");
    }

    // interaction.deferReply();
    async function parse(response) {
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch {
            //ERROR
            return { error: text };
        }
    }

    // plus 1000 digits
    if (digits > 1000) {
        fetch(
            `https://api.pi.delivery/v1/pi?start=${digits}&numberOfDigits=1000&radix=${base}`
        ).then(async (response) => {
            const res = await parse(response);
            if (res.error)
                interaction.editReply("Error: \n`" + res.error + "`\n"); //ERROR

            if (!res.content) return;
            if (res.content) {
                const string =
                    `${res.content.length} ` +
                    (res.content.length > 1 ? "digits" : "digit") +
                    ` digits of pi, starting from the ${digits}th digit (base ${base}): \n\`${res.content}\``;
                interaction.editReply(string);
            }
        });
        return;
    }

    // sub 1001 digits
    fetch(
        `https://api.pi.delivery/v1/pi?start=0&numberOfDigits=${digits}&radix=${base}`
    ).then(async (response) => {
        const res = await parse(response);
        if (res.error) interaction.editReply("Error: \n`" + res.error + "`\n");

        if (!res.content) return;
        if (res.content) {
            const string =
                `${digits} ` +
                (digits == 1 ? "digit" : "digits") +
                ` of pi (base ${base}): \n\`${
                    res.content.slice(0, 1) +
                    (res.content.length >= 2 ? "," : "") +
                    res.content.slice(1)
                }\``;
            interaction.editReply(string);
        }
    });
    return;
};
