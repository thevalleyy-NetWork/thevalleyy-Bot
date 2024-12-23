export default async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const rusasarray = [
        "ruuuuuuuuusas",
        "raaaaaaaaasus",
        "RUSSUS",
        "RUAS",
        "RUUUUUUUUUUUUUUUUUSAS",
        "RAAAAAAAAAAAAAASUS",
        "ach rusas",
        "RASUS du Kek :flushed:",
        "rinsas <:troll:800321754873987112>",
        "susar!",
    ];

    const rusas = rusasarray[Math.floor(Math.random() * rusasarray.length)];
    interaction.channel.send(rusas);
    interaction.reply({ content: "😳", ephemeral: true });
};
