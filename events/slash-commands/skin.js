const Discord = require("discord.js");
const config = require("../../config.json");
const paginationEmbed = require("../../functions/pagination.js");
const { EmbedBuilder, ButtonBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const player = interaction.options.getString("player");

    const fetch = (await import("node-fetch")).default;

    await fetch("https://api.ashcon.app/mojang/v2/user/" + player).then(
        async (response) => {
            try {
                await response.json().then(async (json) => {
                    if (json.code != 200 && json.code != undefined)
                        return interaction.reply(
                            `${json.error} ${json.code} \n\`\`${json.reason}\`\``
                        ); //ERROR

                    let embeds = [];

                    const embed0 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Gesicht (2D)")
                        .setImage(
                            "https://visage.surgeplay.com/face/" + json.uuid
                        );

                    const embed1 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Oberkörper (2D)")
                        .setImage(
                            "https://visage.surgeplay.com/front/" + json.uuid
                        );

                    const embed2 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Körper (2D)")
                        .setImage(
                            "https://visage.surgeplay.com/frontfull/" +
                                json.uuid
                        );

                    const embed3 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Kopf (3D)")
                        .setImage(
                            "https://visage.surgeplay.com/head/" + json.uuid
                        );

                    const embed4 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Oberkörper (3D)")
                        .setImage(
                            "https://visage.surgeplay.com/bust/" + json.uuid
                        );

                    const embed5 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Körper (3D)")
                        .setImage(
                            "https://visage.surgeplay.com/full/" + json.uuid
                        );

                    const embed6 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Infos & Links")
                        .setThumbnail(
                            "https://visage.surgeplay.com/head/" + json.uuid
                        )
                        .addFields([
                            {
                                name: "​",
                                value: "• [Skin-API](https://visage.surgeplay.com/index.html)",
                                inline: true,
                            },
                            {
                                name: "​",
                                value: `• [Name-API](https://api.ashcon.app/mojang/v2/user/${json.username})`,
                                inline: true,
                            },
                            {
                                name: "​",
                                value: `• [NameMC](https://de.namemc.com/profile/${json.username})`,
                                inline: true,
                            },
                            {
                                name: "​",
                                value: `• [MCProfile](https://mcprofile.net/profile/${json.uuid})`,
                                inline: true,
                            },
                            {
                                name: "​",
                                value: `• [Skin](${json.textures.skin.url}) ${
                                    json.textures.slim ? "(Slim)" : ""
                                }`,
                                inline: true,
                            },
                        ]);

                    if (json.textures.cape)
                        embed6.addFields([
                            {
                                name: "​",
                                value: `• [Cape](${json.textures.cape.url})`,
                                inline: true,
                            },
                        ]);

                    embed6.addFields([
                        {
                            name: "uuid",
                            value: `\`${json.uuid}\``,
                            inline: true,
                        },
                        {
                            name: "name",
                            value: `\`${json.username}\``,
                            inline: true,
                        },
                    ]);

                    if (json.created_at != null)
                        embed6.addFields([
                            {
                                name: "created",
                                value: `<t:${Math.round(
                                    new Date(json.created_at).getTime() / 1000
                                )}:R>`,
                                inline: true,
                            },
                        ]);

                    const embed7 = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTimestamp()
                        .setTitle("Skin von " + json.username)
                        .setDescription("Raw Data")
                        .setThumbnail(
                            "https://visage.surgeplay.com/head/" + json.uuid
                        )
                        .addFields([
                            {
                                name: "value",
                                value: `\`${json.textures.raw.value}\``,
                                inline: true,
                            },
                            {
                                name: "signature",
                                value: `\`${json.textures.raw.signature}\``,
                                inline: true,
                            },
                        ]);

                    const button1 = new ButtonBuilder()
                        .setCustomId("previousbtn")
                        .setLabel("◀️")
                        .setStyle("Secondary");

                    const button2 = new ButtonBuilder()
                        .setCustomId("nextbtn")
                        .setLabel("▶️")
                        .setStyle("Secondary");

                    buttonList = [button1, button2];

                    if (embed8) {
                        embeds.push(
                            embed0,
                            embed1,
                            embed2,
                            embed3,
                            embed4,
                            embed5,
                            embed7,
                            embed8,
                            embed6
                        );
                    } else {
                        embeds.push(
                            embed0,
                            embed1,
                            embed2,
                            embed3,
                            embed4,
                            embed5,
                            embed7,
                            embed6
                        );
                    }

                    paginationEmbed(interaction, embeds, buttonList);
                });
            } catch (error) {
                interaction.reply(
                    `Es gab einen Fehler beim Abfragen der API: \n${error}\n\n${response.statusText} (Code: ${response.status})`
                );
            }
        }
    );
};
