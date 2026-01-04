import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.caesar;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const text = interaction.options.getString("text");
    let key;
    interaction.options.getNumber("key") == null ? (key = 2) : (key = interaction.options.getNumber("key"));
    const decrypt = interaction.options.getBoolean("decrypt");
    const specialchars = interaction.options.getBoolean("specialchars");

    /*
    kleines a = 97
    großes A = 65
    kleines z = 122
    großes Z = 90
    */

    if (!decrypt) {
        let encrypted = "";
        for (let i = 0; i < text.length; i++) {
            let char = text.charCodeAt(i);
            if (!specialchars) {
                if (char >= 97 && char <= 122) {
                    // kleinbuchstaben
                    char += key % 26;
                    if (char > 122) char -= 26;
                } else if (char >= 65 && char <= 90) {
                    // großbuchstaben
                    char += key % 26;
                    if (char > 90) char -= 26;
                } else {
                    // andere zeichen
                    char += key;
                }
                encrypted += String.fromCharCode(char);
            } else {
                char += key;
                encrypted += String.fromCharCode(char);
            }
        }

        interaction.reply({
            content: "```" + encrypted.substring(0, 2000) + "```",
            allowedMentions: { parse: [] },
            ephemeral: true,
        });
    } else {
        let decrypted = "";
        for (let i = 0; i < text.length; i++) {
            let char = text.charCodeAt(i);
            if (!specialchars) {
                if (char >= 97 && char <= 122) {
                    // kleinbuchstaben
                    char -= key % 26;
                    if (char < 97) char += 26;
                } else if (char >= 65 && char <= 90) {
                    // großbuchstaben
                    char -= key % 26;
                    if (char < 65) char += 26;
                } else {
                    // andere zeichen
                    char -= key;
                }
                decrypted += String.fromCharCode(char);
            } else {
                char -= key;
                decrypted += String.fromCharCode(char);
            }
        }

        interaction.reply({
            content: "```" + decrypted.substring(0, 2000) + "```",
            allowedMentions: { parse: [] },
            ephemeral: true,
        });
    }
};
