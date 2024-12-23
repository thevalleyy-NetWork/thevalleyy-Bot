export default async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let number = interaction.options.getNumber("number");
    if (number > 100 || number < 1) {
        interaction.reply({
            content: "Bitte gib eine Zahl von 1 - 100 an.",
            ephemeral: true,
        });
        return;
    }

    try {
        await interaction.channel.bulkDelete(number);
        client.modLog(`${interaction.user.tag} hat ${number} Nachrichten in ${interaction.channel.name} gelöscht.`, "clear.js");
        interaction.reply(
            `Es \`${number == 1 ? "wurde eine Nachricht" : `wurden ${number} Nachrichten`}\` gelöscht. \nAusgeführt durch: \`` +
                interaction.user.tag +
                "`"
        );
    } catch (error) {
        client.error(error, "clear.js");
    }
};
