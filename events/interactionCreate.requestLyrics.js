const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "SPOTIFY_lyrics") return;

    const iconurl = interaction.guild.iconURL();
    const message = interaction.message;
    const arguments = message.embeds[0].fields[0].value;
    const fetch = (await import("node-fetch")).default;

    const row = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
            .setCustomId(message.components[0].components[0].data.custom_id)
            .setLabel(message.components[0].components[0].data.label)
            .setStyle(message.components[0].components[0].data.style)
            .setDisabled(true)
    );

    await message.edit({ embeds: [message.embeds[0]], components: [row] });

    try {
        const waitEmbed = new Discord.EmbedBuilder()
            .setColor("0099ff")
            .setDescription("Suche nach: `" + arguments + "`...");
        await interaction.reply({ embeds: [waitEmbed] });

        const { title, author, lyrics, thumbnail, links, error } = await fetch(
            `https://some-random-api.ml/lyrics?title=${arguments
                .replaceAll("ä", "ae")
                .replaceAll("ü", "ue")
                .replaceAll("ö", "oe")
                .replaceAll("ß", "ss")}`
        ).then((response) => response.json());

        if (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Es gab einen Fehler...")
                .setDescription("`" + error + "`")
                .setFooter({ text: interaction.guild.name, iconURL: iconurl })
                .setTimestamp();
            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

        const songEmbed = new Discord.EmbedBuilder()
            .setAuthor({
                name: `${author} (${title})`,
                iconURL: interaction.user.avatarURL(),
                url: links.genius,
            })
            .setThumbnail(thumbnail.genius)
            .setDescription(lyrics.substring(0, 4096))
            .setColor("0099ff")
            .setFooter({
                text: interaction.guild.name,
                iconURL: iconurl,
            })
            .setTimestamp();
        await interaction
            .editReply({ embeds: [songEmbed] })
            .catch(async (err) => {
                //ERROR
                await interaction.editReply("Fehler: `" + err + "`");
            });
    } catch (err) {
        //ERROR
        await interaction.editReply("Fehler: `" + err + "`");
    }
};
