const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const fetch = (await
        import ('node-fetch')).default

    try {
    if (interaction.options._subcommand === 'generate') {
        const data = encodeURI(interaction.options._hoistedOptions[0].value);
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}`;

        const attachment = new Discord.AttachmentBuilder()
            .setFile(url)
            .setName('qr.png')
        interaction.reply({ content: `QR-Code für \`${interaction.options._hoistedOptions[0].value.substring(0,1000)}\``, files: [attachment] });
        return
    }

    if (interaction.options._subcommand === 'scan') {
        await interaction.deferReply();
        
        if (
            interaction.options._hoistedOptions[0].attachment.contentType == 'image/png' ||
            interaction.options._hoistedOptions[0].attachment.contentType == 'image/jpeg' ||
            interaction.options._hoistedOptions[0].attachment.contentType == 'image/jpg' ||
            interaction.options._hoistedOptions[0].attachment.contentType == 'image/gif'  
        ) {
        const url = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${interaction.options._hoistedOptions[0].attachment.proxyURL.replace('https://', 'http://')}`;
        
        const response = await fetch(url);
        const json = await response.json();

        if (json[0].symbol[0].error) return interaction.editReply({ content: 'Der QR-Code konnte nicht gescannt werden!\nFehler: `' + json[0].symbol[0].error + "`", ephemeral: true });
        const embed = new Discord.EmbedBuilder()
            .setTitle('QR-Code')
            .setColor(config.standard_color)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL()})
            .setTimestamp()
            .addFields([
                { name: 'Typ', value: json[0].type, inline: true },
                { name: 'Daten', value: json[0].symbol[0].data, inline: true }
            ])
            .setImage(interaction.options._hoistedOptions[0].attachment.url)
        
        interaction.editReply({ embeds: [embed], ephemeral: true });
        return
        } else {
            interaction.editReply({ content: 'Das Bild muss im PNG, JPEG, JPG oder GIF Format sein.', ephemeral: true });
            return
        }
    }
} catch (error) {
    //ERROR
    interaction.editReply({ content: 'Der QR-Code konnte nicht gescannt werden!\nFehler: `' + json[0].symbol[0].error + "`", ephemeral: true });
    console.log(error)
}
}