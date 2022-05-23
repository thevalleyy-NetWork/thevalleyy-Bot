const modlog = '822575095721099304'
const Discord = require('discord.js')
const cooldownSet = new Set()
const he = require('he')
const config = require('./../../config.json')
const bricksetData = require('./../../data/brickset.json')
const paginationEmbed = require('discordjs-button-pagination')
const { MessageEmbed, MessageButton } = require('discord.js')

function validData() {
    if (bricksetData.apikey.status == "error") return bricksetData.apikey.message
    if (bricksetData.userkey.status == "error") return bricksetData.userkey.message
    return true
}

function cooldown(message) {
    if (message.author.id == config.owner) return
        // react and remove the message
    if (cooldownSet.has(message.author.id)) {
        message.react('⏳')
        setTimeout(() => {
            message.delete()
        }, 5000)
        return true
    }

    cooldownSet.add(message.author.id)
    setTimeout(() => {
        cooldownSet.delete(message.author.id)
    }, 120000)
}

module.exports = {
    commands: ['lego'],
    expectedArgs: '<Kategorie> [...]',
    permissionError: 'awkward error',
    minArgs: 0,
    maxArgs: null,
    cooldown: 30000,
    description: "this description is weird",
    callback: async(message, arguments, text) => {
        const fetch = (await
            import ('node-fetch')).default

        if (!arguments[0]) {
            message.reply("Falsche Syntax! Benutze: `" + message.content.split(" ")[0] + " <Kategorie>` für weitere Informationen.\nKategorien: `Set`, `Apistats`, `Themes`, `Subthemes`, `Jahre`, `Reviews`, `Anleitungen`, `Bilder`")
            return
        }
        const fullstar = "<:fullstar:977964060891054161>"
        const emptystar = "<:emptystar:977964082554630194>"

        const button1 = new MessageButton()
            .setCustomId('previousbtn')
            .setLabel('◀️')
            .setStyle('DANGER');

        const button2 = new MessageButton()
            .setCustomId('nextbtn')
            .setLabel('▶️')
            .setStyle('SUCCESS');

        //create an array of buttons

        buttonList = [
            button1,
            button2
        ]

        if (arguments[0].toLowerCase() == "set" || arguments[0].toLowerCase() == "sets") {
            if (!arguments[1]) {
                message.reply(`Falsche Syntax! Benutze: \`${message.content.split(" ")[0]} Set <Suchbegriff>\`\nSuchbegriffe können z. B. die Setnummer, der Namen oder einfach ein genereller Suchbegriff sein.`)
                return
            }

            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            const userhash = bricksetData.userkey.hash

            fetch(`https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${text.substring(text.indexOf(" ") + 1)}"}`).then(async response =>
                response.json()).then(json => {
                if (json.status == "error") {
                    message.reply("Es gab einen Fehler:" + json.message)
                    return
                }


                if (json.sets.length == 0) {
                    message.reply("Es wurde kein passendes Set gefunden.")
                    return
                }

                const sets = []
                for (let i = 0; i < json.sets.length; i++) {

                    const set = json.sets[i]
                    const embed = new MessageEmbed()
                    embed.setColor(config.standard_color)
                    embed.setTitle(set.name)
                    embed.setImage(set.image.imageURL)
                    embed.addField("Setnummer:", `\`${set.number}\``, true)

                    if (set.released == true) {
                        embed.addField("Veröffentlicht:", `Ja: \`${set.year}\``, true)
                    } else {
                        embed.addField("Veröffentlicht:", `Nein, geplant: \`${set.year}\``, true)
                    }
                    if (set.LEGOCom.DE.dateFirstAvailable && set.LEGOCom.DE.dateLastAvailable) {
                        embed.addField("Verfügbar:", `<t:${Math.round(new Date(set.LEGOCom.DE.dateFirstAvailable).getTime() / 1000)}:d> - <t:${Math.round(new Date(set.LEGOCom.DE.dateLastAvailable).getTime() / 1000)}:d> (${set.availability})`, true)
                    }
                    if (set.minifigs) {
                        embed.addField("Stückanzahl:", `\`${set.pieces}\` ⊇ \`${set.minifigs}\` Minifiguren`, true)
                    } else {
                        embed.addField("Stückanzahl:", `\`${set.pieces}\``, true)
                    }
                    if (set.LEGOCom.DE.retailPrice) {
                        embed.addField("Preis (DE):", `${set.LEGOCom.DE.retailPrice}€`, true)
                    }
                    if (!set.ageRange.min || !set.ageRange.max) {} else {
                        embed.addField("Altersempfehlung:", `\`${set.ageRange.min}\` - \`${set.ageRange.max}\``, true)
                    }
                    if (set.dimensions.weight) {
                        embed.addField("Dimensionen:", `\`${Math.round(set.dimensions.depth)}\`×\`${Math.round(set.dimensions.width)}\`×\`${Math.round(set.dimensions.height)}\` cm, \`${Math.round(set.dimensions.weight * 1000)}\` g (${set.packagingType})`, true)
                    } else {
                        if (set.dimensions.depth) {
                            embed.addField("Dimensionen:", `\`${Math.round(set.dimensions.depth)}\`×\`${Math.round(set.dimensions.width)}\`×\`${Math.round(set.dimensions.height)}\` cm (${set.packagingType})`, true)
                        }
                    }
                    if (set.barcode.EAN && set.barcode.UPC) {
                        embed.addField("Barcodes:", `EAN: \`${set.barcode.EAN}\`, UPC: \`${set.barcode.UPC}\``, true)
                    } else if (set.barcode.EAN) {
                        embed.addField("Barcode:", `EAN: \`${set.barcode.EAN}\``, true)
                    } else if (set.barcode.UPC) {
                        embed.addField("Barcode:", `UPC: \`${set.barcode.UPC}\``, true)
                    }
                    if (set.rating) embed.addField("Bewertung:", `${fullstar.repeat(Math.round(set.rating)) + emptystar.repeat(5 - Math.round(set.rating))}`, true)
                    embed.addField("Zuletzt aktualisiert:", `<t:${Math.round(new Date(set.lastUpdated).getTime() / 1000)}:R>`, true)
                    if (set.subtheme) {
                        embed.addField("Theme:", `\`${set.themeGroup}\` ➝ \`${set.theme}\` ➝ \`${set.subtheme}\``, false)
                    } else if (set.theme) {
                        embed.addField("Theme:", `\`${set.themeGroup}\` ➝ \`${set.theme}\``, false)
                    } else {
                        embed.addField("Theme:", `\`${set.themeGroup}\``, false)
                    }
                    embed.addField("​", `[Zu ${set.name} auf Brickset](${set.bricksetURL})`, false)

                    sets.push(embed)
                }

                paginationEmbed(message, sets, buttonList, 120000);
            })
            return
        } else if (arguments[0].toLowerCase() == "apistats") {
            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            fetch(`https://brickset.com/api/v3.asmx/getKeyUsageStats?apikey=${config.keys.brickset}`).then(async response =>
                response.json()).then(json => {
                if (json.status == "error") {
                    message.reply("Es gab einen Fehler beim Abrufen der Daten.")
                    console.log(json.status, json.message)
                    return
                }

                let dataarray = json.apiKeyUsage.slice(0, 24)

                const embed = new Discord.MessageEmbed()
                    .setColor(config.standard_color)
                    .setAuthor({
                        name: "Brickset-API",
                        iconURL: "https://brickset.com/favicon.ico",
                        url: "https://brickset.com/"
                    })
                    .setDescription("Abfragen über den API-Key der " + dataarray.length + " letzten bekannten Tagen")
                    .setTimestamp()
                    .setFooter({
                        text: message.guild.name,
                        iconURL: message.guild.iconURL({ dynamic: true })
                    })
                dataarray.forEach(data => {
                    if (data.count == 1) {
                        embed.addField(`${new Date(data.dateStamp).toLocaleDateString().replaceAll(".",". ")}:`, `\`\`${data.count}\`\` Request`, true)
                    } else {
                        embed.addField(`${new Date(data.dateStamp).toLocaleDateString().replaceAll(".",". ")}:`, `\`\`${data.count}\`\` Requests`, true)
                    }

                });
                embed.addField("​", "[Zu Brickset](https://brickset.com/)", false)
                message.reply({ embeds: [embed] })
            })
            return
        } else if (arguments[0].toLowerCase() == "themes" || arguments[0].toLowerCase() == "theme") {
            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            fetch(`https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`).then(async response =>
                response.json()).then(json => {
                if (json.status == "error") {
                    message.reply("Es gab einen Fehler beim Abrufen der Daten.")
                    console.log(json.status, json.message)
                    return
                }
                if (arguments[1]) {
                    // search for specific theme
                    let foundarr = []
                    json.themes.forEach(theme => {
                        if (theme.theme.toLowerCase().replaceAll(" ", "") == text.toLowerCase().replace("themes", "").replaceAll(" ", "")) {
                            foundarr.push("yes")
                            const embed = new Discord.MessageEmbed()
                                .setColor(config.standard_color)
                                .setTitle(theme.theme)
                                .setTimestamp()
                                .setFooter({
                                    text: message.guild.name,
                                    iconURL: message.guild.iconURL({ dynamic: true })
                                })
                                .addField("Theme:", `\`${theme.theme}\``, true)
                                .addField("Sets zum Theme:", `\`${theme.setCount}\``, true)
                                .addField("Unterthemen:", `\`${theme.subthemeCount}\``, true)
                                .addField("Ersterscheinung:", `\`${theme.yearFrom}\``, true)
                                .addField("Letzterscheinung: ", `\`${theme.yearTo}\``, true)
                                .addField("⌀ Sets pro Jahr:", `\`${Math.round(theme.setCount / (theme.yearTo-theme.yearFrom + 1))}\``, true)
                                .addField("​", `[Alle ${theme.theme}-Sets](https://brickset.com/sets/theme-${theme.theme.replaceAll(" ", "-")})`, false)
                            message.reply({ embeds: [embed] })
                        }
                    })

                    if (foundarr.length == 0) {
                        message.reply("Es wurde kein Theme gefunden.\nMit `" + message.content.split(" ")[0] + " Themes` bekommst du alle Themes angezeigt.")
                    }
                    return
                }

                let dataarray = []
                json.themes.forEach(theme => {
                    dataarray.push(theme.theme)
                });

                const embed = new Discord.MessageEmbed()
                embed.setColor(config.standard_color)
                    .setTitle(`Alle ${json.matches} Lego Themes`)
                    .setTimestamp()
                    .setFooter({
                        text: message.guild.name,
                        iconURL: message.guild.iconURL({ dynamic: true })
                    })
                embed.setDescription(`\`\`\`${dataarray.join(', ')}\`\`\``)
                embed.addField("​", `Du möchtest mehr über ein einzelnes Theme wissen?\nMit \`${message.content.split(" ")[0]} Themes <Name>\` bekommst du mehr Informationen.`, false)
                message.reply({ embeds: [embed] })


            })
            return
        } else if (arguments[0].toLowerCase() == "subthemes" || arguments[0].toLowerCase() == "subtheme") {
            // is the api key working?
            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            // is the given theme valid?
            fetch(`https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`).then(async response =>
                response.json()).then(json_ => {
                if (json_.status == "error") {
                    message.reply("Es gab einen Fehler beim Abrufen der Daten.")
                    console.log(json_.status, json_.message)
                    return
                }

                // is there a theme?
                if (!arguments[1]) {
                    message.reply("Du musst ein Theme angeben.\nMit `" + message.content.split(" ")[0] + " Themes` bekommst du alle Themes angezeigt.")
                    return
                }

                // is the given theme valid?
                let foundarr = []
                json_.themes.forEach(theme => {
                    if (theme.theme.toLowerCase().replaceAll(" ", "") == text.toLowerCase().replace("subthemes", "").replaceAll(" ", "")) {
                        foundarr.push(theme)
                    }
                })

                // it wasn't found
                if (foundarr.length == 0) {
                    message.reply("Es wurde kein Theme gefunden, zu dem Unterthemen angezeigt werden können.\nMit `" + message.content.split(" ")[0] + " Themes` bekommst du alle Themes angezeigt.")
                    return
                }

                // it was found, so let's get all subthemes
                fetch(`https://brickset.com/api/v3.asmx/getSubthemes?apikey=${config.keys.brickset}&theme=${foundarr[0].theme}`).then(async response =>
                    response.json()).then(json => {
                    if (json.status == "error") {
                        message.reply("Es gab einen Fehler beim Abrufen der Daten.")
                        console.log(json.status, json.message)
                        return
                    }

                    // there are no subthemes
                    if (json.matches == 1 && json.subthemes[0].subtheme.toLowerCase() == "{none}") {
                        message.reply(`Zu dem Theme \`${foundarr[0].theme}\` gibt es keine Unterthemen.\nFür mehr Informationen nutze \`${message.content.split(" ")[0]} Themes ${foundarr[0].theme}\`.`)
                        return
                    }


                    dataarray = []
                    for (let i = 0; i < json.matches; i++) {
                        const stheme = json.subthemes[i];

                        // define all embeds
                        const embed = new Discord.MessageEmbed()
                            .setColor(config.standard_color)
                        if (stheme.subtheme.toLowerCase() == "{none}") {
                            embed.setTitle(foundarr[0].theme + " - ohne Subtheme")
                            embed.addField("Sets ohne Subtheme:", `\`${stheme.setCount} / ${foundarr[0].setCount}\``, true)
                            embed.addField("Sets mit Subtheme:", `\`${foundarr[0].setCount - stheme.setCount} / ${foundarr[0].setCount}\``, true)
                            embed.addField("Sets zum Theme " + foundarr[0].theme, `\`${foundarr[0].setCount}\``, true)
                            embed.addField("Erstveröffentlichung:", `\`${foundarr[0].yearFrom}\``, true)
                            embed.addField("Letztveröffentlichung:", `\`${foundarr[0].yearTo}\``, true)
                            embed.addField("​", `[Alle ${foundarr[0].theme}-Sets](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(" ", "-")})`, false)
                        } else {
                            embed.setTitle(foundarr[0].theme + " - " + stheme.subtheme)
                            embed.addField("Name des Unterthemas:", `\`${stheme.subtheme}\``, true)
                            embed.addField("Anzahl aller Sets:", `\`${stheme.setCount}\``, true)
                            embed.addField("⌀ Sets pro Jahr:", `\`${Math.round(stheme.setCount / (stheme.yearTo-stheme.yearFrom + 1))}\``, true)
                            embed.addField("Erstveröffentlichung:", `\`${stheme.yearFrom}\``, true)
                            embed.addField("Letztveröffentlichung:", `\`${stheme.yearTo}\``, true)
                            embed.addField("​", `[Alle ${stheme.subtheme}-Sets](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(" ", "-")}/subtheme-${stheme.subtheme.replaceAll(" ", "-")})`, false)
                        }
                        dataarray.push(embed)

                    }

                    // Call the paginationEmbed method, first three arguments are required
                    // timeout is the time till the reaction collectors are active, after this you can't change pages (in ms), defaults to 120000
                    paginationEmbed(message, dataarray, buttonList, 120000);

                })
            })
            return
        } else if (arguments[0].toLowerCase() == "jahre" || arguments[0].toLowerCase() == "jahr") {
            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            // is the given theme valid?
            fetch(`https://brickset.com/api/v3.asmx/getThemes?apikey=${config.keys.brickset}`).then(async response =>
                response.json()).then(json_ => {
                if (json_.status == "error") {
                    message.reply("Es gab einen Fehler beim Abrufen der Daten.")
                    console.log(json_.status, json_.message)
                    return
                }

                // is there a theme?
                if (!arguments[1]) {
                    message.reply("Du musst ein Theme angeben.\nMit `" + message.content.split(" ")[0] + " Themes` bekommst du alle Themes angezeigt.")
                    return
                }

                // is the given theme valid?
                let foundarr = []
                json_.themes.forEach(theme => {
                    if (theme.theme.toLowerCase().replaceAll(" ", "") == text.toLowerCase().replace("jahre", "").replaceAll(" ", "")) {
                        foundarr.push(theme)
                    }
                })

                // it wasn't found
                if (foundarr.length == 0) {
                    message.reply("Es wurde kein Theme gefunden, zu dem Infos angezeigt werden können.\nMit `" + message.content.split(" ")[0] + " Themes` bekommst du alle Themes angezeigt.")
                    return
                }

                fetch(`https://brickset.com/api/v3.asmx/getYears?apikey=${config.keys.brickset}&Theme=${foundarr[0].theme}`).then(async response =>
                    response.json()).then(json => {

                    const embedarray = []

                    const embed = new Discord.MessageEmbed()
                        .setColor(config.standard_color)
                        .setTitle("Quick Facts")
                        .addField("Theme:", `\`${foundarr[0].theme}\``, true)
                        .addField("Sets:", `\`${foundarr[0].setCount}\``, true)
                        .addField("⌀ Sets pro Jahr:", `\`${Math.round(foundarr[0].setCount / (json.matches))}\``, true)
                        .addField("Erstveröffentlichung:", `\`${foundarr[0].yearFrom}\``, true)
                        .addField("Letztveröffentlichung:", `\`${foundarr[0].yearTo}\``, true)
                        .addField("​", `[Alle ${foundarr[0].theme}-Sets](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(" ", "-")})`, false)

                    embedarray.push(embed)

                    json.years.forEach(yr => {
                        const embed = new Discord.MessageEmbed()
                            .setColor(config.standard_color)
                            .addField("Theme:", `\`${foundarr[0].theme}\``, true)
                            .addField("Jahr:", `\`${yr.year}\``, true)
                            .addField("Sets:", `\`${yr.setCount}\``, true)
                            .addField("​", `[Alle ${foundarr[0].theme}-Sets (${yr.year})](https://brickset.com/sets/theme-${foundarr[0].theme.replaceAll(" ", "-")}/year-${yr.year})`, false)


                        embedarray.push(embed)
                    });
                    paginationEmbed(message, embedarray, buttonList, 120000);
                })
            })
            return

        } else if (arguments[0].toLowerCase() == "reviews" || arguments[0].toLowerCase() == "review") {
            if (!arguments[1]) return message.reply("Du musst eine Setnummer angeben.")
            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            const userhash = bricksetData.userkey.hash

            fetch(`https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${arguments[1]}"}`).then(async response =>
                response.json()).then(json => {
                if (json.status == "error") {
                    message.reply("Es gab einen Fehler:" + json.message)
                    return
                }
                if (json.sets.length == 0) return message.reply("Es wurde kein Set gefunden.")
                if (json.sets.length > 1) return message.reply("Es kommen mehrere Sets in Frage. Bitte gib eine konkrete Setnummer an.")

                fetch(`https://brickset.com/api/v3.asmx/getReviews?apikey=${config.keys.brickset}&setID=${json.sets[0].setID}`).then(async response =>
                    response.json()).then(json => {
                    if (json.status == "error") {
                        message.reply("Es gab einen Fehler:" + json.message)
                    }

                    const revlist = []
                    for (let i = 0; i < json.reviews.length; i++) {
                        const rev = json.reviews[i];

                        const embed = new Discord.MessageEmbed()
                            .setColor(config.standard_color)
                            .setTitle(rev.title)
                            .setAuthor(rev.author)
                            .setTimestamp(new Date(rev.datePosted).getTime())
                        if (rev.review.length > 4096) {
                            embed.setDescription(he.decode(rev.review.replaceAll(/<\/?p>/g, "").replaceAll(/<\/?h3>/g, "**").substring(0, 4090)) + "...")
                        } else {
                            embed.setDescription(he.decode(rev.review.replaceAll(/<\/?p>/g, "").replaceAll(/<\/?h3>/g, "**")))
                        }
                        embed.addField("​", "**Bewertungen**:", false)
                        embed.addField("Generell:", `${fullstar.repeat(Math.round(rev.rating.overall)) + emptystar.repeat(5 - Math.round(rev.rating.overall))}`, false)
                        embed.addField("Teile:", `${fullstar.repeat(Math.round(rev.rating.parts)) + emptystar.repeat(5 - Math.round(rev.rating.parts))}`, true)
                        embed.addField("Bauerlebnis:", `${fullstar.repeat(Math.round(rev.rating.buildingExperience)) + emptystar.repeat(5 - Math.round(rev.rating.buildingExperience))}`, true)
                        embed.addField("Spielerlebnis:", `${fullstar.repeat(Math.round(rev.rating.playability)) + emptystar.repeat(5 - Math.round(rev.rating.playability))}`, true)
                        embed.addField("Preiswertigkeit:", `${fullstar.repeat(Math.round(rev.rating.valueForMoney)) + emptystar.repeat(5 - Math.round(rev.rating.valueForMoney))}`, true)

                        revlist.push(embed)
                    }

                    paginationEmbed(message, revlist, buttonList, 120000);
                })
            })

            return
        } else if (arguments[0].toLowerCase() == "anleitungen" || arguments[0].toLowerCase() == "anleitung") {

            if (!arguments[1]) {
                message.reply(`Falsche Syntax! Benutze: \`${message.content.split(" ")[0]} Anleitungen <Setnummer>\``)
                return
            }

            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            fetch(`https://brickset.com/api/v3.asmx/getInstructions2?apikey=${config.keys.brickset}&setNumber=${arguments[1]}`).then(async response =>
                response.json()).then(json => {
                if (json.status == "error") {
                    message.reply("Es gab einen Fehler beim Abrufen der Daten.")
                    console.log(json.status, json.message)
                    return
                }

                console.log(json)

                if (json.instructions.length == 0) {
                    message.reply("Es wurde keine Anleitung gefunden.")
                    return
                }

                const insts = []
                for (let i = 0; i < json.instructions.length; i++) {
                    const inst = json.instructions[i];

                    const embed = new Discord.MessageEmbed()
                        .setColor(config.standard_color)
                        .setTitle(`Anleitung ${i+1}`)
                        .setDescription(inst.description)
                        .addField("​", `[Zu diesser Anleitung](${encodeURI(inst.URL)})`, false)
                        .setTimestamp()

                    insts.push(embed)
                }

                paginationEmbed(message, insts, buttonList, 120000);
            })
            return
        } else if (arguments[0].toLowerCase() == "bilder" || arguments[0].toLowerCase() == "bild") {
            if (!arguments[1]) return message.reply("Du musst eine Setnummer angeben.")
            if (validData() !== true) {
                message.reply(validData())
                return
            }

            if (cooldown(message) == true) return

            const userhash = bricksetData.userkey.hash

            fetch(`https://brickset.com/api/v3.asmx/getSets?apikey=${config.keys.brickset}&userHash=${userhash}&params={"query":"${arguments[1]}"}`).then(async response =>
                response.json()).then(json => {
                if (json.status == "error") {
                    message.reply("Es gab einen Fehler:" + json.message)
                    return
                }
                if (json.sets.length == 0) return message.reply("Es wurde kein Set gefunden.")
                if (json.sets.length > 1) return message.reply("Es kommen mehrere Sets in Frage. Bitte gib eine konkrete Setnummer an.")
                const setname = json.sets[0].name

                fetch(`https://brickset.com/api/v3.asmx/getAdditionalImages?apikey=${config.keys.brickset}&setID=${json.sets[0].setID}`).then(async response =>
                    response.json()).then(json => {
                    if (json.status == "error") {
                        message.reply("Es gab einen Fehler:" + json.message)
                    }

                    if (json.images.length == 0) {
                        message.reply("Es wurden keine Bilder für `" + setname + "` gefunden.")
                        console.log(json)
                        const imglist = []
                        for (let i = 0; i < json.additionalImages.length; i++) {
                            const img = json.additionalImages[i];

                            const embed = new Discord.MessageEmbed()
                                .setColor(config.standard_color)
                                .setTimestamp()
                                .setTitle(`${setname} - Bild ${i+1}`)
                            if (img.imageURL) { embed.setImage(img.imageURL) } else if (img.thumbnailURL) { embed.setImage(img.thumbnailURL) } else return

                                imglist.push(embed)
                        }

                        paginationEmbed(message, imglist, buttonList, 120000);
                    }
                })
            })

            return
        } else {
            message.reply("Unbekannte Kategorie!\nAlle Kategorien: `Set`, `Apistats`, `Themes`, `Subthemes`, `Jahre`, `Reviews`, `Anleitungen`, `Bilder`")
            return
        }

    },
    permissions: [],
    requiredRoles: ['Nice One']
}