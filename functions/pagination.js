const config = require("../config.json");

const {
    ActionRowBuilder,
    Message,
    EmbedBuilder,
    ButtonBuilder,
} = require("discord.js");

/**
 * Creates a pagination embed
 * @param {Interaction} interaction
 * @param {EmbedBuilder[]} pages
 * @param {ButtonBuilder[]} buttonList
 * @param {number} timeout
 * @returns
 */
const paginationEmbed = async (
    interaction,
    pages,
    buttonList,
    timeout = 120000
) => {
    if (!interaction && !interaction.channel)
        throw new Error("Channel is inaccessible.");
    if (!pages) throw new Error("Pages are not given.");
    if (!buttonList) throw new Error("Buttons are not given.");
    if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
        throw new Error(
            "Link buttons are not supported with discordjs-button-pagination"
        );
    if (buttonList.length !== 2) throw new Error("Need two buttons.");

    let page = 0;

    if (pages.length === 1)
        return await interaction.reply({
            embeds: [pages[0].setFooter({ text: `Seite 1 / 1` })],
        });

    const row = new ActionRowBuilder().addComponents(buttonList);

    const curPage = await interaction.reply({
        embeds: [
            pages[page].setFooter({
                text: `Seite ${page + 1} / ${pages.length}`,
            }),
        ],
        components: [row],
    });

    const filter = (i) =>
        i.custom_id === buttonList[0].custom_id ||
        i.custom_id === buttonList[1].custom_id;

    const collector = await curPage.createMessageComponentCollector({
        filter,
        time: timeout,
    });

    collector.on("collect", async (i) => {
        if (interaction.user.id !== i.user.id && i.user.id !== config.owner)
            return i.deferUpdate();

        switch (i.customId) {
            case buttonList[0].data.custom_id:
                page = page > 0 ? --page : pages.length - 1;
                break;
            case buttonList[1].data.custom_id:
                page = page + 1 < pages.length ? ++page : 0;
                break;
            default:
                break;
        }
        await i.deferUpdate();
        await i.editReply({
            embeds: [
                pages[page].setFooter({
                    text: `Seite ${page + 1} / ${pages.length}`,
                }),
            ],
            components: [row],
        });
        collector.resetTimer();
    });

    collector.on("end", () => {
        interaction
            .fetchReply()
            .then((reply) => {
                if (!reply) return console.log("Reply not found");

                const disabledRow = new ActionRowBuilder().addComponents(
                    buttonList[0].setDisabled(true),
                    buttonList[1].setDisabled(true)
                );
                interaction.editReply({
                    embeds: [
                        pages[page].setFooter({
                            text: `Page ${page + 1} / ${pages.length}`,
                        }),
                    ],
                    components: [disabledRow],
                });
            })
            .catch((err) => console.log(err));
    });

    return curPage;
};
module.exports = paginationEmbed;
