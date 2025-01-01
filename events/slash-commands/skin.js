import { EmbedBuilder, ButtonBuilder } from "discord.js";

import paginationEmbed from "../../functions/pagination.js";
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.skin;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const player = interaction.options.getString("player");
    client.log(`Searching for ${player} (${interaction.user.tag})`, "skin.js");

    await fetch("https://api.ashcon.app/mojang/v2/user/" + player).then(async (response) => {
        try {
            await response.json().then(async (json) => {
                if (json.code != 200 && json.code != undefined) return interaction.reply(`${json.error} ${json.code} \n\`\`${json.reason}\`\``);

                const embeds = []; // TODO: überarbeiten mit https://vzge.me/index.html

                const embed0 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.face2d[locale])
                    .setImage("https://visage.surgeplay.com/face/" + json.uuid);

                const embed1 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.upperbody2d[locale])
                    .setImage("https://visage.surgeplay.com/front/" + json.uuid);

                const embed2 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.body2d[locale])
                    .setImage("https://visage.surgeplay.com/frontfull/" + json.uuid);

                const embed3 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.head3d[locale])
                    .setImage("https://visage.surgeplay.com/head/" + json.uuid);

                const embed4 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.upperbody3d[locale])
                    .setImage("https://visage.surgeplay.com/bust/" + json.uuid);

                const embed5 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.body3d[locale])
                    .setImage("https://visage.surgeplay.com/full/" + json.uuid);

                const embed6 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.links[locale])
                    .setThumbnail("https://visage.surgeplay.com/head/" + json.uuid)
                    .addFields([
                        {
                            name: "​",
                            value: `• [${l10n.skinAPI[locale]}](https://visage.surgeplay.com/index.html)`,
                            inline: true,
                        },
                        {
                            name: "​",
                            value: `• [${l10n.nameAPI[locale]}](https://api.ashcon.app/mojang/v2/user/${json.username})`,
                            inline: true,
                        },
                        {
                            name: "​",
                            value: `• [${l10n.namemc[locale]}](https://de.namemc.com/profile/${json.username})`,
                            inline: true,
                        },
                        {
                            name: "​",
                            value: `• [${l10n.mcprofile[locale]}](https://mcprofile.net/profile/${json.uuid})`,
                            inline: true,
                        },
                        {
                            name: "​",
                            value: `• [${l10n.skin[locale]}](${json.textures.skin.url}) ${json.textures.slim ? "(Slim)" : ""}`,
                            inline: true,
                        },
                    ]);

                if (json.textures.cape)
                    embed6.addFields([
                        {
                            name: "​",
                            value: `• [${l10n.cape[locale]}](${json.textures.cape.url})`,
                            inline: true,
                        },
                    ]);

                embed6.addFields([
                    {
                        name: l10n.uuid[locale],
                        value: `\`${json.uuid}\``,
                        inline: true,
                    },
                    {
                        name: l10n.name[locale],
                        value: `\`${json.username}\``,
                        inline: true,
                    },
                ]);

                if (json.created_at != null)
                    embed6.addFields([
                        {
                            name: l10n.created[locale],
                            value: `<t:${Math.round(new Date(json.created_at).getTime() / 1000)}:R>`,
                            inline: true,
                        },
                    ]);

                const embed7 = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setTimestamp()
                    .setTitle(l10n.skinOf[locale].replace("{user}" ,json.username))
                    .setDescription(l10n.rawdata[locale])
                    .setThumbnail("https://visage.surgeplay.com/head/" + json.uuid)
                    .addFields([
                        {
                            name: l10n.value[locale],
                            value: `\`${json.textures.raw.value}\``,
                            inline: true,
                        },
                        {
                            name: l10n.signature[locale],
                            value: `\`${json.textures.raw.signature}\``,
                            inline: true,
                        },
                    ]);

                const button0 = new ButtonBuilder().setCustomId("previousbtn").setLabel("◀️").setStyle("Secondary");
                const button1 = new ButtonBuilder().setCustomId("nextbtn").setLabel("▶️").setStyle("Secondary");
                const buttonList = [button0, button1];

                embeds.push(embed0, embed1, embed2, embed3, embed4, embed5, embed7, embed6);
                paginationEmbed(interaction, embeds, buttonList);
            });
        } catch (error) {
            interaction.reply({
                content: l10n.error[locale].replace("{error}", `\n${error}\n\n${response.statusText} (Code: ${response.status})`),
                ephemeral: true,
            })
        }
    });
};
