import { EmbedBuilder, ButtonBuilder } from "discord.js";
import he from "he";

import paginationEmbed from "../../functions/pagination.js";
import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.lego;

const cooldownSet = new Set();
const fullstar = "<:fullstar:977964060891054161>";
const emptystar = "<:emptystar:977964082554630194>";

const button1 = new ButtonBuilder().setCustomId("previousbtn").setLabel("◀️").setStyle("Secondary");
const button2 = new ButtonBuilder().setCustomId("nextbtn").setLabel("▶️").setStyle("Secondary");

const buttonList = [button1, button2];

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    if (!interaction.isChatInputCommand()) return;

    const fetch = (await import("node-fetch")).default; // TODO: is this neccessary or can we use default fetch();
    const userhash = client.brickset.userkey.hash;

    if (client.brickset.userkey.status != "success")
        return interaction.reply({
            content: l10n.notAvailable[locale],
            ephemeral: true,
        });

    if (interaction.options._subcommand == "set") {
        fetch(
            `https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${interaction.options._hoistedOptions[0].value}"}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json?.message),
                        ephemeral: true,
                    });
                    return;
                }

                if (json.sets.length == 0) {
                    interaction.reply({
                        content: l10n.noSet[locale],
                        ephemeral: true,
                    });
                    return;
                }

                const sets = [];
                for (let i = 0; i < json.sets.length; i++) {
                    const set = json.sets[i];
                    const embed = new EmbedBuilder();
                    embed.setColor(config.colors.default);
                    embed.setTitle(set.name);
                    embed.setImage(set.image.imageURL);
                    embed.addFields([
                        {
                            name: `${l10n.setNumber[locale]}:`,
                            value: `\`${set.number}\``,
                            inline: true,
                        },
                    ]);

                    if (set.released == true) {
                        embed.addFields([
                            {
                                name: `${l10n.released[locale]}:`,
                                value: `${l10n.yes[locale]}: \`${set.year}\``,
                                inline: true,
                            },
                        ]);
                    } else {
                        embed.addFields([
                            {
                                name: `${l10n.released[locale]}:`,
                                value: `${l10n.no[locale]}, ${l10n.planned[locale]}: \`${set.year}\``,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.LEGOCom.DE.dateFirstAvailable && set.LEGOCom.DE.dateLastAvailable) {
                        embed.addFields([
                            {
                                name: `${l10n.available[locale]}:`,
                                value: `<t:${Math.round(new Date(set.LEGOCom.DE.dateFirstAvailable).getTime() / 1000)}:d> - <t:${Math.round(
                                    new Date(set.LEGOCom.DE.dateLastAvailable).getTime() / 1000
                                )}:d> (${set.availability})`,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.minifigs) {
                        embed.addFields([
                            {
                                name: `${l10n.pieceCount[locale]}:`,
                                value: `\`${set.pieces}\` ⊇ \`${set.minifigs}\` ${l10n.miniFigures[locale]}`,
                                inline: true,
                            },
                        ]);
                    } else {
                        if (set.pieces) {
                            embed.addFields([
                                {
                                    name: `${l10n.pieceCount[locale]}:`,
                                    value: `\`${set.pieces}\``,
                                    inline: true,
                                },
                            ]);
                        }
                    }
                    if (set.LEGOCom.DE.retailPrice) {
                        embed.addFields([
                            {
                                name: `${l10n.price[locale]}:`,
                                value: `${set.LEGOCom.DE.retailPrice}€`,
                                inline: true,
                            },
                        ]);
                    }
                    if (!set.ageRange.min || !set.ageRange.max) {
                    } else {
                        embed.addFields([
                            {
                                name: `${l10n.ageRecommendation[locale]}:`,
                                value: `\`${set.ageRange.min}\` - \`${set.ageRange.max}\``,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.dimensions.weight) {
                        embed.addFields([
                            {
                                name: `${l10n.dimensions[locale]}:`,
                                value: `\`${Math.round(set.dimensions.depth)}\`×\`${Math.round(set.dimensions.width)}\`×\`${Math.round(
                                    set.dimensions.height
                                )}\` cm, \`${Math.round(set.dimensions.weight * 1000)}\` g (${set.packagingType})`,
                                inline: true,
                            },
                        ]);
                    } else {
                        if (set.dimensions.depth) {
                            embed.addFields([
                                {
                                    name: `${l10n.dimensions[locale]}:`,
                                    value: `\`${Math.round(set.dimensions.depth)}\`×\`${Math.round(set.dimensions.width)}\`×\`${Math.round(
                                        set.dimensions.height
                                    )}\` cm (${set.packagingType})`,
                                    inline: true,
                                },
                            ]);
                        }
                    }
                    if (set.barcode.EAN && set.barcode.UPC) {
                        embed.addFields([
                            {
                                name: `${l10n.barcode.plural[locale]}:`,
                                value: `EAN: \`${set.barcode.EAN}\`, \nUPC: \`${set.barcode.UPC}\``,
                                inline: true,
                            },
                        ]);
                    } else if (set.barcode.EAN) {
                        embed.addFields([
                            {
                                name: `${l10n.barcode.singular[locale]}:`,
                                value: `EAN: \`${set.barcode.EAN}\``,
                                inline: true,
                            },
                        ]);
                    } else if (set.barcode.UPC) {
                        embed.addFields([
                            {
                                name: `${l10n.barcode.singular[locale]}:`,
                                value: `UPC: \`${set.barcode.UPC}\``,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.rating)
                        embed.addFields([
                            {
                                name: `${l10n.rating[locale]}:`,
                                value: `${fullstar.repeat(Math.round(set.rating)) + emptystar.repeat(5 - Math.round(set.rating))}`,
                                inline: true,
                            },
                        ]);
                    embed.addFields([
                        {
                            name: `${l10n.updated[locale]}:`,
                            value: `<t:${Math.round(new Date(set.lastUpdated).getTime() / 1000)}:R>`,
                            inline: true,
                        },
                    ]);
                    if (set.subtheme) {
                        embed.addFields([
                            {
                                name: `${l10n.theme[locale]}:`,
                                value: `\`${set.themeGroup}\` ➝ \`${set.theme}\` ➝ \`${set.subtheme}\``,
                                inline: false,
                            },
                        ]);
                    } else if (set.theme) {
                        embed.addFields([
                            {
                                name: `${l10n.theme[locale]}:`,
                                value: `\`${set.themeGroup}\` ➝ \`${set.theme}\``,
                                inline: false,
                            },
                        ]);
                    } else {
                        embed.addFields([
                            {
                                name: `${l10n.theme[locale]}:`,
                                value: `\`${set.themeGroup}\``,
                                inline: false,
                            },
                        ]);
                    }
                    embed.addFields([
                        {
                            name: "​",
                            value: `${l10n.link[locale].replace("{name}", set.name).replace("{url}", set.bricksetURL)}`,
                            inline: false,
                        },
                    ]);

                    sets.push(embed);
                }

                paginationEmbed(interaction, sets, buttonList, 120000);
            });
        return;
    }

    if (interaction.options._subcommand == "api") {
        fetch(`https://brickset.com/api/v3.asmx/getKeyUsageStats?apikey=${config.keys.brickset}`)
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json?.message),
                        ephemeral: true,
                    });
                    return;
                }

                let dataarray = json.apiKeyUsage.slice(0, 24);

                const embed = new EmbedBuilder()
                    .setColor(config.colors.default)
                    .setAuthor({
                        name: "Brickset-API",
                        iconURL: "https://www.google.com/s2/favicons?sz=64&domain=brickset.com",
                        url: "https://brickset.com/",
                    })
                    .setTimestamp()
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: interaction.guild.iconURL(),
                    });

                if (dataarray.length == 1) {
                    embed.setDescription(l10n.api.description.singular[locale].replace("{n}", dataarray.length));
                } else {
                    embed.setDescription(l10n.api.description.plural[locale].replace("{n}", dataarray.length));
                }

                if (dataarray.length > 25) {
                    dataarray = dataarray.slice(0, 24); // limit to 25 entries
                }

                dataarray.forEach((data) => {
                    if (data.count == 1) {
                        embed.addFields([
                            {
                                name: `${new Date(data.dateStamp).toLocaleDateString()}:`,
                                value: `\`\`${data.count}\`\` ${l10n.api.request.singular[locale]}`,
                                inline: true,
                            },
                        ]);
                    } else {
                        embed.addFields([
                            {
                                name: `${new Date(data.dateStamp).toLocaleDateString()}:`,
                                value: `\`\`${data.count}\`\` ${l10n.api.request.plural[locale]}`,
                                inline: true,
                            },
                        ]);
                    }
                });
                embed.addFields([
                    {
                        name: "​",
                        value: `[${l10n.api.toBrickset[locale]}](https://brickset.com/)`,
                        inline: false,
                    },
                ]);
                interaction.reply({ embeds: [embed] });
            });
        return;
    }

    if (interaction.options._subcommand == "theme") {
        fetch(`https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`)
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json?.message),
                        ephemeral: true,
                    });
                    return;
                }

                if (interaction.options._hoistedOptions[0]) {
                    // search for specific theme
                    const foundarr = [];
                    json.themes.forEach((theme) => {
                        if (
                            theme.theme.toLowerCase().replaceAll(" ", "") ==
                            interaction.options._hoistedOptions[0].value.toLowerCase().replaceAll(" ", "")
                        ) {
                            foundarr.push("yes");
                            const embed = new EmbedBuilder()
                                .setColor(config.colors.default)
                                .setTitle(theme.theme)
                                .setTimestamp()
                                .setFooter({
                                    text: interaction.guild.name,
                                    iconURL: interaction.guild.iconURL(),
                                })
                                .addFields([
                                    {
                                        name: `${l10n.theme[locale]}:`,
                                        value: `\`${theme.theme}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.setsToTheme[locale]}:`,
                                        value: `\`${theme.setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.subThemes[locale]}:`,
                                        value: `\`${theme.subthemeCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.firstSet[locale]}:`,
                                        value: `\`${theme.yearFrom}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.lastSet[locale]}:`,
                                        value: `\`${theme.yearTo}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.setsPerYear[locale]}:`,
                                        value: `\`${Math.ceil(theme.setCount / (theme.yearTo - theme.yearFrom + 1))}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[${l10n.allSets[locale].replace(
                                            "{theme}",
                                            theme.theme
                                        )}](https://brickset.com/sets/theme-${theme.theme.replaceAll(" ", "-")})`,
                                        inline: false,
                                    },
                                ]);
                            interaction.reply({ embeds: [embed] });
                        }
                    });

                    if (foundarr.length == 0) {
                        interaction.reply({
                            content: l10n.noTheme[locale],
                            ephemeral: true,
                        });
                    }
                    return;
                }

                let dataarray = [];
                json.themes.forEach((theme) => {
                    dataarray.push(theme.theme);
                });

                const embed = new EmbedBuilder();
                embed.setColor(config.colors.default).setTitle(l10n.allThemes[locale].replace("{n}", json.matches)).setTimestamp().setFooter({
                    text: interaction.guild.name,
                    iconURL: interaction.guild.iconURL(),
                });
                embed.setDescription(`\`\`\`${dataarray.join(", ")}\`\`\``);
                embed.addFields([
                    {
                        name: "​",
                        value: l10n.moreAboutTheme[locale],
                        inline: false,
                    },
                ]);
                interaction.reply({ embeds: [embed] });
            });
        return;
    }

    if (interaction.options._subcommand == "subtheme") {
        // is the given theme valid?
        fetch(`https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`)
            .then(async (response) => response.json())
            .then((json_) => {
                if (json_.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json_?.message),
                        ephemeral: true,
                    });
                    return;
                }

                // is the given theme valid?
                const foundarr = [];
                json_.themes.forEach((theme) => {
                    if (
                        theme.theme.toLowerCase().replaceAll(" ", "") ==
                        interaction.options._hoistedOptions[0].value.toLowerCase().replaceAll(" ", "")
                    ) {
                        foundarr.push(theme);
                    }
                });

                // it wasn't found
                if (foundarr.length == 0) {
                    interaction.reply({
                        content: l10n.noSubTheme[locale],
                        ephemeral: true,
                    });
                    return;
                }

                // it was found, so let's get all subthemes
                fetch(`https://brickset.com/api/v3.asmx/getSubthemes?apikey=${config.keys.brickset}&theme=${foundarr[0].theme}`)
                    .then(async (response) => response.json())
                    .then((json) => {
                        if (json.status == "error") {
                            interaction.reply({
                                content: l10n.error[locale].replace("{error}", json?.message),
                                ephemeral: true,
                            });
                            return;
                        }

                        // there are no subthemes
                        if (json.matches == 1 && json.subthemes[0].subtheme.toLowerCase() == "{none}") {
                            interaction.reply({
                                content: l10n.noSubThemeFound[locale].replaceAll("{theme}", foundarr[0].theme),
                                ephemeral: true,
                            });
                            return;
                        }

                        const dataarray = [];
                        for (let i = 0; i < json.matches; i++) {
                            const stheme = json.subthemes[i];

                            // define all embeds
                            const embed = new EmbedBuilder().setColor(config.colors.default);
                            if (stheme.subtheme.toLowerCase() == "{none}") {
                                embed.setTitle(foundarr[0].theme + ` - ${l10n.mainTheme[locale]}`);
                                embed.addFields([
                                    {
                                        name: `${l10n.setsWithoutSubtheme[locale]}:`,
                                        value: `\`${stheme.setCount} / ${foundarr[0].setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.setsWithSubtheme[locale]}:`,
                                        value: `\`${foundarr[0].setCount - stheme.setCount} / ${foundarr[0].setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.setsToTheme[locale]} ${foundarr[0].theme}:`,
                                        value: `\`${foundarr[0].setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.firstPublished[locale]}:`,
                                        value: `\`${foundarr[0].yearFrom}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.firstPublished[locale]}:`,
                                        value: `\`${foundarr[0].yearTo}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[${l10n.allSets[locale].replace(
                                            "{theme}",
                                            foundarr[0].theme
                                        )}](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(" ", "-")})`,
                                        inline: false,
                                    },
                                ]);
                            } else {
                                embed.setTitle(foundarr[0].theme + " - " + stheme.subtheme);
                                embed.addFields([
                                    {
                                        name: `${l10n.subtopicName[locale]}:`,
                                        value: `\`${stheme.subtheme}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.amountOfSets[locale]}:`,
                                        value: `\`${stheme.setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.setsPerYear[locale]}:`,
                                        value: `\`${Math.ceil(stheme.setCount / (stheme.yearTo - stheme.yearFrom + 1))}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.firstPublished[locale]}:`,
                                        value: `\`${stheme.yearFrom}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.lastPublished[locale]}:`,
                                        value: `\`${stheme.yearTo}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[${l10n.allSets[locale].replace(
                                            "{theme}",
                                            stheme.subtheme
                                        )}](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(
                                            " ",
                                            "-"
                                        )}/subtheme-${stheme.subtheme.replaceAll(" ", "-")})`,
                                        inline: false,
                                    },
                                ]);
                            }
                            dataarray.push(embed);
                        }

                        // Call the paginationEmbed method, first three arguments are required
                        // timeout is the time the reaction collectors are active, after this you can't change pages (in ms), defaults to 120000
                        paginationEmbed(interaction, dataarray, buttonList, 120000);
                    });
            });
        return;
    }

    if (interaction.options._subcommand == "year") {
        // is the given theme valid?
        fetch(`https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`)
            .then(async (response) => response.json())
            .then((json_) => {
                if (json_.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json_?.message),
                        ephemeral: true,
                    });
                    return;
                }

                // is the given theme valid?
                const foundarr = [];
                json_.themes.forEach((theme) => {
                    if (
                        theme.theme.toLowerCase().replaceAll(" ", "") ==
                        interaction.options._hoistedOptions[0].value.toLowerCase().replaceAll(" ", "")
                    ) {
                        foundarr.push(theme);
                    }
                });

                // it wasn't found
                if (foundarr.length == 0) {
                    interaction.reply(l10n.noThemeFound[locale]);
                    return;
                }

                fetch(`https://brickset.com/api/v3.asmx/getYears?apikey=${config.keys.brickset}&Theme=${foundarr[0].theme}`)
                    .then(async (response) => response.json())
                    .then((json) => {
                        if (json_.status == "error") {
                            interaction.reply({
                                content: l10n.error[locale].replace("{error}", json_?.message),
                                ephemeral: true,
                            });
                            return;
                        }

                        const embedarray = [];

                        const embed = new EmbedBuilder()
                            .setColor(config.colors.default)
                            .setTitle(l10n.quickFacts[locale])
                            .addFields([
                                {
                                    name: `${l10n.theme[locale]}:`,
                                    value: `\`${foundarr[0].theme}\``,
                                    inline: true,
                                },
                                {
                                    name: `${l10n.sets[locale]}:`,
                                    value: `\`${foundarr[0].setCount}\``,
                                    inline: true,
                                },
                                {
                                    name: `${l10n.setsPerYear[locale]}:`,
                                    value: `\`${Math.ceil(foundarr[0].setCount / json.matches)}\``,
                                    inline: true,
                                },
                                {
                                    name: `${l10n.firstPublished[locale]}:`,
                                    value: `\`${foundarr[0].yearFrom}\``,
                                    inline: true,
                                },
                                {
                                    name: `${l10n.lastPublished[locale]}:`,
                                    value: `\`${foundarr[0].yearTo}\``,
                                    inline: true,
                                },
                                {
                                    name: "​",
                                    value: `[${l10n.allSets[locale].replace(
                                        "{theme}",
                                        foundarr[0].theme
                                    )}](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(" ", "-")})`,
                                    inline: false,
                                },
                            ]);

                        embedarray.push(embed);

                        json.years.forEach((yr) => {
                            const embed = new EmbedBuilder()
                                .setColor(config.colors.default)
                                .setTitle(`${foundarr[0].theme} - ${yr.year}`)
                                .addFields([
                                    {
                                        name: `${l10n.sets[locale]}:`,
                                        value: `\`${yr.setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.theme[locale]}:`,
                                        value: `\`${foundarr[0].theme}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `${l10n.year[locale]}:`,
                                        value: `\`${yr.year}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[${l10n.allSets[locale].replace("{theme}", foundarr[0].theme)} (${
                                            yr.year
                                        })](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(" ", "-")}/year-${yr.year})`,
                                        inline: false,
                                    },
                                ]);

                            embedarray.push(embed);
                        });
                        paginationEmbed(interaction, embedarray, buttonList, 120000);
                    });
            });
        return;
    }

    if (interaction.options._subcommand == "review") {
        fetch(
            `https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${interaction.options._hoistedOptions[0].value}"}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json?.message),
                        ephemeral: true,
                    });
                    return;
                }

                if (json.sets.length == 0) return interaction.reply(l10n.noSet[locale]);
                // if (json.sets.length > 1) // TODO: Auswahlmenü für die Sets

                const setName = json.sets[0].name;

                fetch(`https://brickset.com/api/v3.asmx/getReviews?apikey=${config.keys.brickset}&setID=${json.sets[0].setID}`)
                    .then(async (response) => response.json())
                    .then((json) => {
                        if (json.status == "error") {
                            interaction.reply({
                                content: l10n.error[locale].replace("{error}", json?.message),
                                ephemeral: true,
                            });
                            return;
                        }

                        if (json.reviews.length == 0) {
                            interaction.reply({
                                content: l10n.noReviews[locale].replace("{setName}", setName),
                                ephemeral: true,
                            });
                            return;
                        }

                        const revlist = [];
                        for (let i = 0; i < json.reviews.length; i++) {
                            const rev = json.reviews[i];

                            const embed = new EmbedBuilder()
                                .setColor(config.colors.default)
                                .setTitle(rev.title)
                                .setAuthor({ name: rev.author })
                                .setTimestamp(new Date(rev.datePosted).getTime());
                            if (rev.review.length > 4096) {
                                embed.setDescription(
                                    he.decode(
                                        rev.review
                                            .replaceAll(/<\/?p>/g, "")
                                            .replaceAll(/<\/?h3>/g, "**")
                                            .substring(0, 4090)
                                    ) + "..."
                                );
                            } else {
                                embed.setDescription(he.decode(rev.review.replaceAll(/<\/?p>/g, "").replaceAll(/<\/?h3>/g, "**")));
                            }
                            embed.addFields([
                                {
                                    name: "​",
                                    value: `**${l10n.ratings[locale]}**:`,
                                    inline: false,
                                },
                                {
                                    name: `**${l10n.overall[locale]}**:`,
                                    value: `${
                                        fullstar.repeat(Math.round(rev.rating.overall)) + emptystar.repeat(5 - Math.round(rev.rating.overall))
                                    }`,
                                    inline: false,
                                },
                                {
                                    name: `${l10n.pieces[locale]}:`,
                                    value: `${fullstar.repeat(Math.round(rev.rating.parts)) + emptystar.repeat(5 - Math.round(rev.rating.parts))}`,
                                    inline: true,
                                },
                                {
                                    name: `${l10n.buildingExperience[locale]}:`,
                                    value: `${
                                        fullstar.repeat(Math.round(rev.rating.buildingExperience)) +
                                        emptystar.repeat(5 - Math.round(rev.rating.buildingExperience))
                                    }`,
                                    inline: true,
                                },
                                {
                                    name: `${l10n.playingExperience[locale]}:`,
                                    value: `${
                                        fullstar.repeat(Math.round(rev.rating.playability)) + emptystar.repeat(5 - Math.round(rev.rating.playability))
                                    }`,
                                    inline: true,
                                },
                                {
                                    name: `${l10n.valueForMoney[locale]}:`,
                                    value: `${
                                        fullstar.repeat(Math.round(rev.rating.valueForMoney)) +
                                        emptystar.repeat(5 - Math.round(rev.rating.valueForMoney))
                                    }`,
                                    inline: true,
                                },
                            ]);

                            revlist.push(embed);
                        }

                        paginationEmbed(interaction, revlist, buttonList, 300000);
                    });
            });

        return;
    }

    if (interaction.options._subcommand == "instructions") {
        fetch(
            `https://brickset.com/api/v3.asmx/getInstructions2?apikey=${config.keys.brickset}&setNumber=${interaction.options._hoistedOptions[0].value}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json?.message),
                        ephemeral: true,
                    });
                    return;
                }

                if (json.instructions.length == 0) {
                    interaction.reply({
                        content: l10n.noInstruction[locale],
                        ephemeral: true,
                    });
                    return;
                }

                const insts = [];
                for (let i = 0; i < json.instructions.length; i++) {
                    const inst = json.instructions[i];

                    const embed = new EmbedBuilder()
                        .setColor(config.colors.default)
                        .setTitle(`${l10n.instruction[locale]} ${i + 1}`)
                        .setDescription(inst.description)
                        .addFields([
                            {
                                name: "​",
                                value: `[${l10n.toInstruction[locale]}](${encodeURI(inst.URL)})`,
                                inline: false,
                            },
                        ])
                        .setTimestamp();

                    insts.push(embed);
                }

                paginationEmbed(interaction, insts, buttonList, 120000);
            });
        return;
    }

    if (interaction.options._subcommand == "images") {
        fetch(
            `https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${interaction.options._hoistedOptions[0].value}"}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply({
                        content: l10n.error[locale].replace("{error}", json?.message),
                        ephemeral: true,
                    });
                    return;
                }

                if (json.sets.length == 0)
                    return interaction.reply({
                        content: l10n.noSet[locale],
                        ephemeral: true,
                    });
                // if (json.sets.length > 1) return interaction.reply("Es kommen mehrere Sets in Frage. Bitte gib eine konkrete Setnummer an.");
                // TODO: Auswahlmenü für die Sets

                const setName = json.sets[0].name;

                fetch(`https://brickset.com/api/v3.asmx/getAdditionalImages?apikey=${config.keys.brickset}&setID=${json.sets[0].setID}`)
                    .then(async (response) => response.json())
                    .then((json) => {
                        if (json.status == "error") {
                            interaction.reply({
                                content: l10n.error[locale].replace("{error}", json?.message),
                                ephemeral: true,
                            });
                            return;
                        }

                        if (json.additionalImages.length == 0)
                            return interaction.reply({
                                content: l10n.noImages[locale].replace("{setName}", setName),
                                ephemeral: true,
                            });

                        const imglist = [];
                        for (let i = 0; i < json.additionalImages.length; i++) {
                            const img = json.additionalImages[i];

                            const embed = new EmbedBuilder()
                                .setColor(config.colors.default)
                                .setTimestamp()
                                .setTitle(`${setName} - ${l10n.image[locale]} ${i + 1}`);
                            if (img.imageURL) {
                                embed.setImage(img.imageURL);
                            } else if (img.thumbnailURL) {
                                embed.setImage(img.thumbnailURL);
                            } else return;

                            imglist.push(embed);
                        }

                        paginationEmbed(interaction, imglist, buttonList, 120000);
                    });
            });

        return;
    }
};
