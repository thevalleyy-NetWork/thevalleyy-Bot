const { PermissionsBitField } = require("discord.js");

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const textthatishouldsay = interaction.options.getString("text");

    interaction.reply({ content: "Done", ephemeral: true });

    if (
        interaction.member.permissions.has(
            PermissionsBitField.Flags.MentionEveryone
        )
    ) {
        interaction.channel.send({
            content: textthatishouldsay.substring(0, 2000),
        });
    } else {
        interaction.channel.send({
            content: textthatishouldsay.substring(0, 2000),
            allowedMentions: { parse: [] },
        });
    }
};
