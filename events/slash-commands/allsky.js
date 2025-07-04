import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ComponentType } from "discord.js";
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.allsky;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    let x = 0;
    let y = 0;
    const now = Date.now();

    const iconurl = interaction.guild.iconURL();
    const idStart = "SKY_";

    const emptyButton0 = new ButtonBuilder().setCustomId("SKY_empty0").setLabel("X").setStyle("Secondary").setDisabled(true);
    const emptyButton1 = new ButtonBuilder().setCustomId("SKY_empty1").setLabel("X").setStyle("Secondary").setDisabled(true);
    const emptyButton2 = new ButtonBuilder().setCustomId("SKY_empty2").setLabel("X").setStyle("Secondary").setDisabled(true);
    const emptyButton3 = new ButtonBuilder().setCustomId("SKY_empty3").setLabel("X").setStyle("Secondary").setDisabled(true);

    const buttonUp = new ButtonBuilder().setCustomId("SKY_up").setLabel("🔼").setStyle("Secondary");
    const buttonDown = new ButtonBuilder().setCustomId("SKY_down").setLabel("🔽").setStyle("Secondary");
    const buttonRight = new ButtonBuilder().setCustomId("SKY_right").setLabel("▶️").setStyle("Secondary");
    const buttonLeft = new ButtonBuilder().setCustomId("SKY_left").setLabel("◀️").setStyle("Secondary");
    const buttonReset = new ButtonBuilder().setCustomId("SKY_reset").setLabel("🔄").setStyle("Secondary").setDisabled(true);

    const embed = new EmbedBuilder()
        .setTitle(l10n.embed.title[locale])
        .setColor(config.colors.default)
        .setTimestamp(now)
        .setFooter({ text: interaction.guild.name, iconURL: iconurl })
        .setImage("https://archive.allsky.tv/AMS52/LATEST/010314.jpg") // TODO: add more skies to discover
        .addFields([
            { name: l10n.embed.fields.location.name[locale], value: l10n.embed.fields.location.value[locale], inline: true },
            {
                name: l10n.embed.fields.source.name[locale],
                value: l10n.embed.fields.source.value[locale],
                inline: true,
            },
        ]);

    const buttonListUp = [emptyButton0, buttonUp, emptyButton1];
    const buttonListMiddle = [buttonLeft, buttonReset, buttonRight];
    const buttonListDown = [emptyButton2, buttonDown, emptyButton3];

    const rowUp = new ActionRowBuilder().addComponents(buttonListUp);
    const rowMiddle = new ActionRowBuilder().addComponents(buttonListMiddle);
    const rowDown = new ActionRowBuilder().addComponents(buttonListDown);

    interaction
        .reply({
            components: [rowUp, rowMiddle, rowDown],
            embeds: [embed],
        })
        .then(async (msg) => {
            const collector = await msg.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 60000,
            });

            collector.on("collect", async (i) => {
                if (i.message.interactionMetadata.id !== msg.id) return
                if (!i.customId.startsWith(idStart)) return;
                if (i.user.id !== interaction.user.id && i.user.id != config.owner) {
                    i.reply({
                        content: l10n.preventOthers[locale].replace("{user}", interaction.user.username),
                        ephemeral: true,
                    });
                    return;
                }

                await i.deferUpdate();
                collector.resetTimer();

                if (i.customId.endsWith("up")) {
                    // 0 -> 1;
                    // 1 -> 2;
                    // 2 -> 0;

                    y = (y + 1) % 3;
                }

                if (i.customId.endsWith("down")) {
                    y = (y + 2) % 3;
                }

                if (i.customId.endsWith("right")) {
                    x = (x + 1) % 5;
                }

                if (i.customId.endsWith("left")) {
                    x = (x + 4) % 5;
                }

                if (i.customId.endsWith("reset")) {
                    x = y = 0;
                }

                buttonReset.setDisabled(x === 0 && y === 0); // disable reset button if x and y are 0

                const embed = new EmbedBuilder()
                    .setTitle(l10n.editEmbed.title[locale].replace("{x}", x).replace("{y}", y))
                    .setColor(config.colors.default)
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: iconurl,
                    })
                    .setTimestamp(now);

                const images = [
                    "https://archive.allsky.tv/AMS52/LATEST/010314.jpg",
                    "https://archive.allsky.tv/AMS52/LATEST/010315.jpg",
                    "https://archive.allsky.tv/AMS52/LATEST/010316.jpg",
                    "https://archive.allsky.tv/AMS52/LATEST/010317.jpg",
                    "https://archive.allsky.tv/AMS52/LATEST/010318.jpg",
                    "https://archive.allsky.tv/AMS52/LATEST/010319.jpg",
                    "https://archive.allsky.tv/AMS52/LATEST/010320.jpg"
                ];

                if (y == 1) embed.setImage(images[5]);
                else if (y >= 2) embed.setImage(images[6]);
                else embed.setImage(images[x]);

                const buttonListUp = [emptyButton0, buttonUp, emptyButton1];
                const buttonListMiddle = [buttonLeft, buttonReset, buttonRight];
                const buttonListDown = [emptyButton2, buttonDown, emptyButton3];

                const rowUp = new ActionRowBuilder().addComponents(buttonListUp);
                const rowMiddle = new ActionRowBuilder().addComponents(buttonListMiddle);
                const rowDown = new ActionRowBuilder().addComponents(buttonListDown);

                i.editReply({
                    components: [rowUp, rowMiddle, rowDown],
                    embeds: [embed],
                });

                // TODO: Doppeltes /sky verhindern
            });

            collector.on("end", async () => {
                try {
                    for (let i = 0; i < buttonListUp.length; i++) {
                        const btn = buttonListUp[i];
                        btn.setDisabled(true);
                        buttonListUp[i] = btn;
                    }

                    for (let i = 0; i < buttonListMiddle.length; i++) {
                        const btn = buttonListMiddle[i];
                        btn.setDisabled(true);
                        buttonListMiddle[i] = btn;
                    }

                    for (let i = 0; i < buttonListDown.length; i++) {
                        const btn = buttonListDown[i];
                        btn.setDisabled(true);
                        buttonListDown[i] = btn;
                    }

                    const disabledRowUp = new ActionRowBuilder().addComponents(buttonListUp);
                    const disabledRowMiddle = new ActionRowBuilder().addComponents(buttonListMiddle);
                    const disabledRowDown = new ActionRowBuilder().addComponents(buttonListDown);

                    msg.edit({
                        components: [disabledRowUp, disabledRowMiddle, disabledRowDown],
                    });
                } catch (error) {
                    client.error(error, "allsky.js");
                }
            });
        });
};
