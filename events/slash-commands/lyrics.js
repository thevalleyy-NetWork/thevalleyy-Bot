const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const iconurl = interaction.guild.iconURL();

    try {
        const fetch = (await import("node-fetch")).default;

        const waitEmbed = new Discord.EmbedBuilder()
            .setColor("0099ff")
            .setDescription(
                "Suche nach: `" +
                    interaction.options.getString("song").substring(0, 150) +
                    "`..."
            );

        interaction.reply({ embeds: [waitEmbed] });
        const { title, author, lyrics, thumbnail, links, error } = await fetch(
            `https://some-random-api.ml/lyrics?title=${interaction.options
                .getString("song")
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
            interaction.editReply({ embeds: [errorEmbed] });
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

        await interaction.editReply({ embeds: [songEmbed] }).catch((err) => {
            client.error(err, "lyrics.js");
        });
    } catch (err) {
        client.error(err, "lyrics.js");
    }
};
