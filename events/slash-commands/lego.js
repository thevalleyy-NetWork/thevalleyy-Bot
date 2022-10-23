const Discord = require("discord.js");
const { EmbedBuilder, ButtonBuilder } = require("discord.js");
const he = require("he");

const paginationEmbed = require("../../functions/pagination.js");
const config = require("../../config.json");

const cooldownSet = new Set();

const fullstar = "<:fullstar:977964060891054161>";
const emptystar = "<:emptystar:977964082554630194>";

const button1 = new ButtonBuilder()
    .setCustomId("previousbtn")
    .setLabel("◀️")
    .setStyle("Secondary");

const button2 = new ButtonBuilder()
    .setCustomId("nextbtn")
    .setLabel("▶️")
    .setStyle("Secondary");

buttonList = [button1, button2];

function cooldown(interaction) {
    if (interaction.user.id == config.owner) return;
    if (cooldownSet.has(interaction.user.id)) {
        interaction.reply({
            content:
                "⏳ Dieser Command kann nur alle 20 Sekunden verwendet werden. ⏳",
            ephemeral: true,
        });
        return true;
    }

    cooldownSet.add(interaction.user.id);
    setTimeout(() => {
        cooldownSet.delete(interaction.user.id);
    }, 20000);
}

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const fetch = (await import("node-fetch")).default;
    const userhash = client.brickset.userkey.hash;

    if (client.brickset.userkey.status != "success")
        return interaction.reply({
            content:
                "Der Lego Befehl ist wegen einem fehlerhaften API-Key gerade nicht verfügbar.",
            ephemeral: true,
        });

    if (interaction.options._subcommand == "set") {
        if (cooldown(interaction)) return;

        fetch(
            `https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${interaction.options._hoistedOptions[0].value}"}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply("Es gab einen Fehler:" + json.message);
                    return;
                }

                if (json.sets.length == 0) {
                    interaction.reply("Es wurde kein passendes Set gefunden.");
                    return;
                }

                const sets = [];
                for (let i = 0; i < json.sets.length; i++) {
                    const set = json.sets[i];
                    const embed = new EmbedBuilder();
                    embed.setColor(config.standard_color);
                    embed.setTitle(set.name);
                    embed.setImage(set.image.imageURL);
                    embed.addFields([
                        {
                            name: "Setnummer:",
                            value: `\`${set.number}\``,
                            inline: true,
                        },
                    ]);

                    if (set.released == true) {
                        embed.addFields([
                            {
                                name: "Veröffentlicht:",
                                value: `Ja: \`${set.year}\``,
                                inline: true,
                            },
                        ]);
                    } else {
                        embed.addFields([
                            {
                                name: "Veröffentlicht:",
                                value: `Nein, geplant: \`${set.year}\``,
                                inline: true,
                            },
                        ]);
                    }
                    if (
                        set.LEGOCom.DE.dateFirstAvailable &&
                        set.LEGOCom.DE.dateLastAvailable
                    ) {
                        embed.addFields([
                            {
                                name: "Verfügbar:",
                                value: `<t:${Math.round(
                                    new Date(
                                        set.LEGOCom.DE.dateFirstAvailable
                                    ).getTime() / 1000
                                )}:d> - <t:${Math.round(
                                    new Date(
                                        set.LEGOCom.DE.dateLastAvailable
                                    ).getTime() / 1000
                                )}:d> (${set.availability})`,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.minifigs) {
                        embed.addFields([
                            {
                                name: "Stückanzahl:",
                                value: `\`${set.pieces}\` ⊇ \`${set.minifigs}\` Minifiguren`,
                                inline: true,
                            },
                        ]);
                    } else {
                        embed.addFields([
                            {
                                name: "Stückanzahl:",
                                value: `\`${set.pieces}\``,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.LEGOCom.DE.retailPrice) {
                        embed.addFields([
                            {
                                name: "Preis (DE):",
                                value: `${set.LEGOCom.DE.retailPrice}€`,
                                inline: true,
                            },
                        ]);
                    }
                    if (!set.ageRange.min || !set.ageRange.max) {
                    } else {
                        embed.addFields([
                            {
                                name: "Altersempfehlung:",
                                value: `\`${set.ageRange.min}\` - \`${set.ageRange.max}\``,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.dimensions.weight) {
                        embed.addFields([
                            {
                                name: "Dimensionen:",
                                value: `\`${Math.round(
                                    set.dimensions.depth
                                )}\`×\`${Math.round(
                                    set.dimensions.width
                                )}\`×\`${Math.round(
                                    set.dimensions.height
                                )}\` cm, \`${Math.round(
                                    set.dimensions.weight * 1000
                                )}\` g (${set.packagingType})`,
                                inline: true,
                            },
                        ]);
                    } else {
                        if (set.dimensions.depth) {
                            embed.addFields([
                                {
                                    name: "Dimensionen:",
                                    value: `\`${Math.round(
                                        set.dimensions.depth
                                    )}\`×\`${Math.round(
                                        set.dimensions.width
                                    )}\`×\`${Math.round(
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
                                name: "Barcodes:",
                                value: `EAN: \`${set.barcode.EAN}\`, \nUPC: \`${set.barcode.UPC}\``,
                                inline: true,
                            },
                        ]);
                    } else if (set.barcode.EAN) {
                        embed.addFields([
                            {
                                name: "Barcode:",
                                value: `EAN: \`${set.barcode.EAN}\``,
                                inline: true,
                            },
                        ]);
                    } else if (set.barcode.UPC) {
                        embed.addFields([
                            {
                                name: "Barcode:",
                                value: `UPC: \`${set.barcode.UPC}\``,
                                inline: true,
                            },
                        ]);
                    }
                    if (set.rating)
                        embed.addFields([
                            {
                                name: "Bewertung:",
                                value: `${
                                    fullstar.repeat(Math.round(set.rating)) +
                                    emptystar.repeat(5 - Math.round(set.rating))
                                }`,
                                inline: true,
                            },
                        ]);
                    embed.addFields([
                        {
                            name: "Zuletzt aktualisiert:",
                            value: `<t:${Math.round(
                                new Date(set.lastUpdated).getTime() / 1000
                            )}:R>`,
                            inline: true,
                        },
                    ]);
                    if (set.subtheme) {
                        embed.addFields([
                            {
                                name: "Theme:",
                                value: `\`${set.themeGroup}\` ➝ \`${set.theme}\` ➝ \`${set.subtheme}\``,
                                inline: false,
                            },
                        ]);
                    } else if (set.theme) {
                        embed.addFields([
                            {
                                name: "Theme:",
                                value: `\`${set.themeGroup}\` ➝ \`${set.theme}\``,
                                inline: false,
                            },
                        ]);
                    } else {
                        embed.addFields([
                            {
                                name: "Theme:",
                                value: `\`${set.themeGroup}\``,
                                inline: false,
                            },
                        ]);
                    }
                    embed.addFields([
                        {
                            name: "​",
                            value: `[Zu ${set.name} auf Brickset](${set.bricksetURL})`,
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
        if (cooldown(interaction) == true) return;

        fetch(
            `https://brickset.com/api/v3.asmx/getKeyUsageStats?apikey=${config.keys.brickset}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply(
                        "Es gab einen Fehler beim Abrufen der Daten."
                    );
                    console.log(json.status, json.message);
                    return;
                }

                let dataarray = json.apiKeyUsage.slice(0, 24);

                const embed = new Discord.EmbedBuilder()
                    .setColor(config.standard_color)
                    .setAuthor({
                        name: "Brickset-API",
                        iconURL: "https://brickset.com/favicon.ico",
                        url: "https://brickset.com/",
                    })
                    .setDescription(
                        "Abfragen über den API-Key der " +
                            dataarray.length +
                            " letzten bekannten Tagen"
                    )
                    .setTimestamp()
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: interaction.guild.iconURL(),
                    });
                dataarray.forEach((data) => {
                    if (data.count == 1) {
                        embed.addFields([
                            {
                                name: `${new Date(data.dateStamp)
                                    .toLocaleDateString()
                                    .replaceAll(".", ". ")}:`,
                                value: `\`\`${data.count}\`\` Request`,
                                inline: true,
                            },
                        ]);
                    } else {
                        embed.addFields([
                            {
                                name: `${new Date(data.dateStamp)
                                    .toLocaleDateString()
                                    .replaceAll(".", ". ")}:`,
                                value: `\`\`${data.count}\`\` Requests`,
                                inline: true,
                            },
                        ]);
                    }
                });
                embed.addFields([
                    {
                        name: "​",
                        value: "[Zu Brickset](https://brickset.com/)",
                        inline: false,
                    },
                ]);
                interaction.reply({ embeds: [embed] });
            });
        return;
    }

    if (interaction.options._subcommand == "theme") {
        if (cooldown(interaction) == true) return;

        fetch(
            `https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply(
                        "Es gab einen Fehler beim Abrufen der Daten."
                    );
                    console.log(json.status, json.message);
                    return;
                }
                if (interaction.options._hoistedOptions[0]) {
                    // search for specific theme
                    let foundarr = [];
                    json.themes.forEach((theme) => {
                        if (
                            theme.theme.toLowerCase().replaceAll(" ", "") ==
                            interaction.options._hoistedOptions[0].value
                                .toLowerCase()
                                .replaceAll(" ", "")
                        ) {
                            foundarr.push("yes");
                            const embed = new Discord.EmbedBuilder()
                                .setColor(config.standard_color)
                                .setTitle(theme.theme)
                                .setTimestamp()
                                .setFooter({
                                    text: interaction.guild.name,
                                    iconURL: interaction.guild.iconURL(),
                                })
                                .addFields([
                                    {
                                        name: "Theme:",
                                        value: `\`${theme.theme}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Sets zum Theme:",
                                        value: `\`${theme.setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Unterthemen:",
                                        value: `\`${theme.subthemeCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Ersterscheinung:",
                                        value: `\`${theme.yearFrom}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Letzterscheinung: ",
                                        value: `\`${theme.yearTo}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "⌀ Sets pro Jahr:",
                                        value: `\`${Math.round(
                                            theme.setCount /
                                                (theme.yearTo -
                                                    theme.yearFrom +
                                                    1)
                                        )}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[Alle ${
                                            theme.theme
                                        }-Sets](https://brickset.com/sets/theme-${theme.theme.replaceAll(
                                            " ",
                                            "-"
                                        )})`,
                                        inline: false,
                                    },
                                ]);
                            interaction.reply({ embeds: [embed] });
                        }
                    });

                    if (foundarr.length == 0) {
                        interaction.reply(
                            "Es wurde kein Theme gefunden.\nMit `/lego theme` bekommst du alle Themes angezeigt."
                        );
                    }
                    return;
                }

                let dataarray = [];
                json.themes.forEach((theme) => {
                    dataarray.push(theme.theme);
                });

                const embed = new Discord.EmbedBuilder();
                embed
                    .setColor(config.standard_color)
                    .setTitle(`Alle ${json.matches} Lego Themes`)
                    .setTimestamp()
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: interaction.guild.iconURL(),
                    });
                embed.setDescription(`\`\`\`${dataarray.join(", ")}\`\`\``);
                embed.addFields([
                    {
                        name: "​",
                        value: `Du möchtest mehr über ein einzelnes Theme wissen?\nMit \`/lego theme <Name>\` bekommst du mehr Informationen.`,
                        inline: false,
                    },
                ]);
                interaction.reply({ embeds: [embed] });
            });
        return;
    }

    if (interaction.options._subcommand == "subtheme") {
        if (cooldown(interaction) == true) return;

        // is the given theme valid?
        fetch(
            `https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`
        )
            .then(async (response) => response.json())
            .then((json_) => {
                if (json_.status == "error") {
                    interaction.reply(
                        "Es gab einen Fehler beim Abrufen der Daten."
                    );
                    console.log(json_.status, json_.message);
                    return;
                }

                // is the given theme valid?
                let foundarr = [];
                json_.themes.forEach((theme) => {
                    if (
                        theme.theme.toLowerCase().replaceAll(" ", "") ==
                        interaction.options._hoistedOptions[0].value.replaceAll(
                            " ",
                            ""
                        )
                    ) {
                        foundarr.push(theme);
                    }
                });

                // it wasn't found
                if (foundarr.length == 0) {
                    interaction.reply(
                        "Es wurde kein Theme gefunden, zu dem Unterthemen angezeigt werden können.\nMit `/lego theme` bekommst du alle Themes angezeigt."
                    );
                    return;
                }

                // it was found, so let's get all subthemes
                fetch(
                    `https://brickset.com/api/v3.asmx/getSubthemes?apikey=${config.keys.brickset}&theme=${foundarr[0].theme}`
                )
                    .then(async (response) => response.json())
                    .then((json) => {
                        if (json.status == "error") {
                            interaction.reply(
                                "Es gab einen Fehler beim Abrufen der Daten."
                            );
                            console.log(json.status, json.message);
                            return;
                        }

                        // there are no subthemes
                        if (
                            json.matches == 1 &&
                            json.subthemes[0].subtheme.toLowerCase() == "{none}"
                        ) {
                            interaction.reply(
                                `Zu dem Theme \`${foundarr[0].theme}\` gibt es keine Unterthemen.\nFür mehr Informationen nutze \`/lego theme ${foundarr[0].theme}\`.`
                            );
                            return;
                        }

                        dataarray = [];
                        for (let i = 0; i < json.matches; i++) {
                            const stheme = json.subthemes[i];

                            // define all embeds
                            const embed = new Discord.EmbedBuilder().setColor(
                                config.standard_color
                            );
                            if (stheme.subtheme.toLowerCase() == "{none}") {
                                embed.setTitle(
                                    foundarr[0].theme + " - Oberthema"
                                );
                                embed.addFields([
                                    {
                                        name: "Sets ohne Subtheme:",
                                        value: `\`${stheme.setCount} / ${foundarr[0].setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Sets mit Subtheme:",
                                        value: `\`${
                                            foundarr[0].setCount -
                                            stheme.setCount
                                        } / ${foundarr[0].setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name:
                                            "Sets zum Theme " +
                                            foundarr[0].theme +
                                            ":",
                                        value: `\`${foundarr[0].setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Erstveröffentlichung:",
                                        value: `\`${foundarr[0].yearFrom}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Letztveröffentlichung:",
                                        value: "Letztveröffentlichung:",
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[Alle ${
                                            foundarr[0].theme
                                        }-Sets](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(
                                            " ",
                                            "-"
                                        )})`,
                                        inline: false,
                                    },
                                ]);
                            } else {
                                embed.setTitle(
                                    foundarr[0].theme + " - " + stheme.subtheme
                                );
                                embed.addFields([
                                    {
                                        name: "Name des Unterthemas:",
                                        value: `\`${stheme.subtheme}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Anzahl aller Sets:",
                                        value: `\`${stheme.setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "⌀ Sets pro Jahr:",
                                        value: `\`${Math.round(
                                            stheme.setCount /
                                                (stheme.yearTo -
                                                    stheme.yearFrom +
                                                    1)
                                        )}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Erstveröffentlichung:",
                                        value: `\`${stheme.yearFrom}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Letztveröffentlichung:",
                                        value: `\`${stheme.yearTo}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[Alle ${
                                            stheme.subtheme
                                        }-Sets](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(
                                            " ",
                                            "-"
                                        )}/subtheme-${stheme.subtheme.replaceAll(
                                            " ",
                                            "-"
                                        )})`,
                                        inline: false,
                                    },
                                ]);
                            }
                            dataarray.push(embed);
                        }

                        // Call the paginationEmbed method, first three arguments are required
                        // timeout is the time till the reaction collectors are active, after this you can't change pages (in ms), defaults to 120000
                        paginationEmbed(
                            interaction,
                            dataarray,
                            buttonList,
                            120000
                        );
                    });
            });
        return;
    }

    if (interaction.options._subcommand == "year") {
        if (cooldown(interaction) == true) return;

        // is the given theme valid?
        fetch(
            `https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`
        )
            .then(async (response) => response.json())
            .then((json_) => {
                if (json_.status == "error") {
                    interaction.reply(
                        "Es gab einen Fehler beim Abrufen der Daten."
                    );
                    console.log(json_.status, json_.message);
                    return;
                }

                // is the given theme valid?
                let foundarr = [];
                json_.themes.forEach((theme) => {
                    if (
                        theme.theme.toLowerCase().replaceAll(" ", "") ==
                        interaction.options._hoistedOptions[0].value.replaceAll(
                            " ",
                            ""
                        )
                    ) {
                        foundarr.push(theme);
                    }
                });

                // it wasn't found
                if (foundarr.length == 0) {
                    interaction.reply(
                        "Es wurde kein Theme gefunden, zu dem Infos angezeigt werden können.\nMit `" +
                            message.content.split(" ")[0] +
                            " Themes` bekommst du alle Themes angezeigt."
                    );
                    return;
                }

                fetch(
                    `https://brickset.com/api/v3.asmx/getYears?apikey=${config.keys.brickset}&Theme=${foundarr[0].theme}`
                )
                    .then(async (response) => response.json())
                    .then((json) => {
                        // ERRORCATCHING?

                        const embedarray = [];

                        const embed = new Discord.EmbedBuilder()
                            .setColor(config.standard_color)
                            .setTitle("Quick Facts")
                            .addFields([
                                {
                                    name: "Theme:",
                                    value: `\`${foundarr[0].theme}\``,
                                    inline: true,
                                },
                                {
                                    name: "Sets:",
                                    value: `\`${foundarr[0].setCount}\``,
                                    inline: true,
                                },
                                {
                                    name: "⌀ Sets pro Jahr:",
                                    value: `\`${Math.round(
                                        foundarr[0].setCount / json.matches
                                    )}\``,
                                    inline: true,
                                },
                                {
                                    name: "Erstveröffentlichung:",
                                    value: `\`${foundarr[0].yearFrom}\``,
                                    inline: true,
                                },
                                {
                                    name: "Letztveröffentlichung:",
                                    value: `\`${foundarr[0].yearTo}\``,
                                    inline: true,
                                },
                                {
                                    name: "​",
                                    value: `[Alle ${
                                        foundarr[0].theme
                                    }-Sets](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(
                                        " ",
                                        "-"
                                    )})`,
                                    inline: false,
                                },
                            ]);

                        embedarray.push(embed);

                        json.years.forEach((yr) => {
                            const embed = new Discord.EmbedBuilder()
                                .setColor(config.standard_color)
                                .setTitle(`${foundarr[0].theme} - ${yr.year}`)
                                .addFields([
                                    {
                                        name: "Sets:",
                                        value: `\`${yr.setCount}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Theme:",
                                        value: `\`${foundarr[0].theme}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Jahr:",
                                        value: `\`${yr.year}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "​",
                                        value: `[Alle ${
                                            foundarr[0].theme
                                        }-Sets (${
                                            yr.year
                                        })](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(
                                            " ",
                                            "-"
                                        )}/year-${yr.year})`,
                                        inline: false,
                                    },
                                ]);

                            embedarray.push(embed);
                        });
                        paginationEmbed(
                            interaction,
                            embedarray,
                            buttonList,
                            120000
                        );
                    });
            });
        return;
    }

    if (interaction.options._subcommand == "review") {
        if (cooldown(interaction) == true) return;

        fetch(
            `https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${interaction.options._hoistedOptions[0].value}"}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply("Es gab einen Fehler:" + json.message);
                    return;
                }
                if (json.sets.length == 0)
                    return interaction.reply("Es wurde kein Set gefunden.");
                if (json.sets.length > 1)
                    return interaction.reply(
                        "Es kommen mehrere Sets in Frage. Bitte gib eine konkrete Setnummer an."
                    );

                fetch(
                    `https://brickset.com/api/v3.asmx/getReviews?apikey=${config.keys.brickset}&setID=${json.sets[0].setID}`
                )
                    .then(async (response) => response.json())
                    .then((json) => {
                        if (json.status == "error") {
                            interaction.reply(
                                "Es gab einen Fehler:" + json.message
                            );
                        }

                        const revlist = [];
                        for (let i = 0; i < json.reviews.length; i++) {
                            const rev = json.reviews[i];

                            const embed = new Discord.EmbedBuilder()
                                .setColor(config.standard_color)
                                .setTitle(rev.title)
                                .setAuthor({ name: rev.author })
                                .setTimestamp(
                                    new Date(rev.datePosted).getTime()
                                );
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
                                embed.setDescription(
                                    he.decode(
                                        rev.review
                                            .replaceAll(/<\/?p>/g, "")
                                            .replaceAll(/<\/?h3>/g, "**")
                                    )
                                );
                            }
                            embed.addFields([
                                {
                                    name: "​",
                                    value: "**Bewertungen**:",
                                    inline: false,
                                },
                                {
                                    name: "Generell:",
                                    value: `${
                                        fullstar.repeat(
                                            Math.round(rev.rating.overall)
                                        ) +
                                        emptystar.repeat(
                                            5 - Math.round(rev.rating.overall)
                                        )
                                    }`,
                                    inline: false,
                                },
                                {
                                    name: "Teile:",
                                    value: `${
                                        fullstar.repeat(
                                            Math.round(rev.rating.parts)
                                        ) +
                                        emptystar.repeat(
                                            5 - Math.round(rev.rating.parts)
                                        )
                                    }`,
                                    inline: true,
                                },
                                {
                                    name: "Bauerlebnis:",
                                    value: `${
                                        fullstar.repeat(
                                            Math.round(
                                                rev.rating.buildingExperience
                                            )
                                        ) +
                                        emptystar.repeat(
                                            5 -
                                                Math.round(
                                                    rev.rating
                                                        .buildingExperience
                                                )
                                        )
                                    }`,
                                    inline: true,
                                },
                                {
                                    name: "Spielerlebnis:",
                                    value: `${
                                        fullstar.repeat(
                                            Math.round(rev.rating.playability)
                                        ) +
                                        emptystar.repeat(
                                            5 -
                                                Math.round(
                                                    rev.rating.playability
                                                )
                                        )
                                    }`,
                                    inline: true,
                                },
                                {
                                    name: "Preiswertigkeit:",
                                    value: `${
                                        fullstar.repeat(
                                            Math.round(rev.rating.valueForMoney)
                                        ) +
                                        emptystar.repeat(
                                            5 -
                                                Math.round(
                                                    rev.rating.valueForMoney
                                                )
                                        )
                                    }`,
                                    inline: true,
                                },
                            ]);

                            revlist.push(embed);
                        }

                        paginationEmbed(
                            interaction,
                            revlist,
                            buttonList,
                            120000
                        );
                    });
            });

        return;
    }

    if (interaction.options._subcommand == "instructions") {
        if (cooldown(interaction) == true) return;

        fetch(
            `https://brickset.com/api/v3.asmx/getInstructions2?apikey=${config.keys.brickset}&setNumber=${interaction.options._hoistedOptions[0].value}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply(
                        "Es gab einen Fehler beim Abrufen der Daten."
                    );
                    console.log(json.status, json.message);
                    return;
                }

                if (json.instructions.length == 0) {
                    interaction.reply("Es wurde keine Anleitung gefunden.");
                    return;
                }

                const insts = [];
                for (let i = 0; i < json.instructions.length; i++) {
                    const inst = json.instructions[i];

                    const embed = new Discord.EmbedBuilder()
                        .setColor(config.standard_color)
                        .setTitle(`Anleitung ${i + 1}`)
                        .setDescription(inst.description)
                        .addFields([
                            {
                                name: "​",
                                value: `[Zu diesser Anleitung](${encodeURI(
                                    inst.URL
                                )})`,
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
        if (cooldown(interaction) == true) return;

        fetch(
            `https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${interaction.options._hoistedOptions[0].value}"}`
        )
            .then(async (response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    interaction.reply("Es gab einen Fehler:" + json.message);
                    return;
                }
                if (json.sets.length == 0)
                    return interaction.reply("Es wurde kein Set gefunden.");
                if (json.sets.length > 1)
                    return interaction.reply(
                        "Es kommen mehrere Sets in Frage. Bitte gib eine konkrete Setnummer an."
                    );
                const setname = json.sets[0].name;

                fetch(
                    `https://brickset.com/api/v3.asmx/getAdditionalImages?apikey=${config.keys.brickset}&setID=${json.sets[0].setID}`
                )
                    .then(async (response) => response.json())
                    .then((json) => {
                        if (json.status == "error") {
                            interaction.reply(
                                "Es gab einen Fehler:" + json.message
                            );
                        }

                        if (json.additionalImages.length == 0)
                            return interaction.reply(
                                "Es wurden keine Bilder für `" +
                                    setname +
                                    "` gefunden."
                            );
                        const imglist = [];
                        for (let i = 0; i < json.additionalImages.length; i++) {
                            const img = json.additionalImages[i];

                            const embed = new Discord.EmbedBuilder()
                                .setColor(config.standard_color)
                                .setTimestamp()
                                .setTitle(`${setname} - Bild ${i + 1}`);
                            if (img.imageURL) {
                                embed.setImage(img.imageURL);
                            } else if (img.thumbnailURL) {
                                embed.setImage(img.thumbnailURL);
                            } else return;

                            imglist.push(embed);
                        }

                        paginationEmbed(
                            interaction,
                            imglist,
                            buttonList,
                            120000
                        );
                    });
            });

        return;
    }
};
