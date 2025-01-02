import { EmbedBuilder, PermissionsBitField } from "discord.js";
import fs from "node:fs";

import config from "../../config.json" with { type: "json" };
import localization from "../../localization.json" with { type: "json" };
const l10n = localization.content.help;

/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").CommandInteraction} interaction
 * @param {string} locale
 */
export default async (client, interaction, locale) => {
    const allCommands = client.cmdlist;

    if (interaction.isAutocomplete()) {
        const filtered = allCommands.filter((choice) => choice.includes(interaction.options.getFocused().toLowerCase())).slice(0, 25);
        await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
        return;
    }

    const iconurl = interaction.guild.iconURL();
    if (interaction.options._subcommand == "about") {
        const embed = new EmbedBuilder()
            .setColor(config.colors.default)
            .setTitle(l10n.baseEmbed.title[locale])
            .setTimestamp()
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL(),
            })
            .addFields([
                {
                    name: l10n.baseEmbed.fields.about.name[locale],
                    value: l10n.baseEmbed.fields.about.value[locale].replace("{user}", interaction.user.tag),
                    inline: true,
                },
                {
                    name: l10n.baseEmbed.fields.supporters.name[locale],
                    value: l10n.baseEmbed.fields.supporters.value[locale],
                    inline: false,
                },
                {
                    name: l10n.baseEmbed.fields.tomato.name[locale],
                    value: l10n.baseEmbed.fields.tomato.value[locale],
                    inline: true,
                },
                {
                    name: l10n.baseEmbed.fields.chaoshosting.name[locale],
                    value: l10n.baseEmbed.fields.chaoshosting.value[locale],
                    inline: true,
                },
                {
                    name: l10n.baseEmbed.fields.everybody.name[locale],
                    value: l10n.baseEmbed.fields.everybody.value[locale],
                    inline: true,
                },
                
            ]);
        interaction.reply({ embeds: [embed] });
        return;
    }

    if (interaction.options._subcommand == "command") {
        const cmd = interaction.options._hoistedOptions[0].value.toString();
        const cmdjson = client.cmds[cmd + ".js"];
        if (!cmdjson) return interaction.reply({ content: l10n.commands.notFound[locale], ephemeral: true });

        const embed = new EmbedBuilder().setTitle(`/${cmd}`).setColor(config.colors.default);

        embed.addFields([
            {
                name: l10n.commands.description[locale],
                value: cmdjson.data.description ? `\`\`\`${cmdjson.data.description_localizations[locale] ? cmdjson.data.description_localizations[locale] : cmdjson.data.description}\`\`\`` : `\`\`\`${l10n.commands.none[locale]}\`\`\``,
                inline: true,
            },
        ]);

        if (cmdjson.data.default_member_permissions) {
            embed.addFields([
                {
                    name: l10n.commands.permissions[locale],
                    value: `\`\`\`${new PermissionsBitField(cmdjson.data.default_member_permissions.toString()).toArray()}\`\`\``,
                    inline: true,
                },
            ]);
        }


        const d = Number(cmdjson.cooldown ? cmdjson.cooldown : config.cooldown_standard);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);

        var hDisplay =
            +h > 0
                ? +h == 1
                    ? +m > 0
                        ? `${l10n.commands.time.hour.singular[locale]}, `
                        : +h == 1
                        ? `${l10n.commands.time.hour.singular[locale]}`
                        : `${h} ${l10n.commands.time.hour.plural[locale]}`
                    : +m > 0
                    ? `${h} ${l10n.commands.time.hour.plural[locale]}, `
                    : `${h} ${l10n.commands.time.hour.plural[locale]}`
                : ``;
        var mDisplay =
            +m > 0
                ? +m == 1
                    ? +s > 0
                        ? `${l10n.commands.time.minute.singular[locale]}, `
                        : +m == 1
                        ? `${l10n.commands.time.minute.singular[locale]}`
                        : `${m} ${l10n.commands.time.minute.plural[locale]}`
                    : +s > 0
                    ? `${m} ${l10n.commands.time.minute.plural[locale]}, `
                    : `${m} ${l10n.commands.time.minute.plural[locale]}`
                : ``;
        var sDisplay = +s > 0 ? (+s == 1 ? `${l10n.commands.time.second.singular[locale]}` : `${s} ${l10n.commands.time.second.plural[locale]}`) : ``;

        embed.addFields([
            {
                name: l10n.commands.cooldown[locale],
                value: `\`\`\`${hDisplay + mDisplay + sDisplay}\`\`\``,
                inline: true,
            },
        ]);

        embed.addFields([
            {
                name: l10n.commands.DMPermission[locale],
                value: cmdjson.data.contexts.includes(1) ? l10n.commands.yes[locale] : l10n.commands.no[locale],
                inline: true,
            },
        ]);

        fs.stat("./events/slash-commands/" + cmdjson.data.name + ".js", (err, stats) => {
            if (err) {
                client.error(err, "help.js");
                embed.addFields([
                    {
                        name: l10n.commands.filesizeCode[locale],
                        value: `\`\`\`${l10n.commands.notAvailable[locale]}\`\`\``,
                        inline: true,
                    },
                ]);
            } else {
                embed.addFields([
                    {
                        name: l10n.commands.filesizeCode[locale],
                        value: `\`\`\`${stats.size} ${l10n.commands.bytes[locale]}\`\`\``,
                        inline: true,
                    },
                ]);
            }

            fs.stat("./scommands/" + cmdjson.data.name + ".js", (err, stats) => {
                if (err) {
                    client.error(err, "help.js");
                    embed.addFields([
                        {
                            name: l10n.commands.filesizeBuilder[locale],
                            value: `\`\`\`${l10n.commands.notAvailable[locale]}\`\`\``,
                            inline: true,
                        },
                    ]);
                } else {
                    embed.addFields([
                        {
                            name: l10n.commands.filesizeBuilder[locale],
                            value: `\`\`\`${stats.size} ${l10n.commands.bytes[locale]}\`\`\``,
                            inline: true,
                        },
                    ]);
                }

                // i dont fucking now why i have to add the code here, it just works
                if (cmdjson.data.options[0]) {
                    // there are options
                    const optionList = [];
                    let options = "";

                    if (cmdjson.data.options[0].options) {
                        // this is a nested command
                        for (let i = 0; i < cmdjson.data.options.length; i++) {
                            const option = cmdjson.data.options[i];
                            optionList.push(option);
                        }

                        optionList.map((option) => {
                            options += `/${cmdjson.data.name} ${option.name}: ` + `\n\t${l10n.commands.description[locale]}: ${option.description} `;

                            if (option.options[0]) {
                                option.options.map((subOption) => {
                                    options +=
                                        `\n\t${subOption.name}: ` +
                                        `\n\t\t${l10n.commands.description[locale]}: ${subOption.description_localizations[locale] ? subOption.description_localizations[locale] : subOption.description} ` +
                                        `\n\t\t${l10n.commands.type[locale]}: ${subOption.type
                                            .toString()
                                            .replace("11",l10n.commands.optionTypes[11][locale])
                                            .replace("10",l10n.commands.optionTypes[10][locale])
                                            .replace("9", l10n.commands.optionTypes[9][locale])
                                            .replace("8", l10n.commands.optionTypes[8][locale])
                                            .replace("7", l10n.commands.optionTypes[7][locale])
                                            .replace("6", l10n.commands.optionTypes[6][locale])
                                            .replace("5", l10n.commands.optionTypes[5][locale])
                                            .replace("4", l10n.commands.optionTypes[4][locale])
                                            .replace("3", l10n.commands.optionTypes[3][locale])
                                            .replace("2", l10n.commands.optionTypes[2][locale])
                                            .replace("1", l10n.commands.optionTypes[1][locale])}` +
                                        `\n\t\t${l10n.commands.required[locale]}: ${subOption.required ? l10n.commands.yesEmote[locale] : l10n.commands.noEmote[locale]} ` +
                                        `${subOption.choices ? `\n\t\t${l10n.commands.choices[locale]}: ${l10n.commands.yesEmote[locale]}` : ""} ` +
                                        `${subOption.autocomplete ? `\n\t\t${l10n.commands.autocomplete[locale]}: ${l10n.commands.yesEmote[locale]}` : ""} \n\n`;
                                });
                            }
                        });
                    } else {
                        for (let i = 0; i < cmdjson.data.options.length; i++) {
                            const option = cmdjson.data.options[i];
                            optionList.push(option);
                        }

                        optionList.map((option) => {
                            options +=
                                `${option.name}: ` +
                                `\n\t${l10n.commands.description[locale]}: ${option.description_localizations[locale] ? option.description_localizations[locale] : option.description} ` +
                                `\n\t${l10n.commands.type[locale]}: ${option.type
                                    .toString()
                                    .replace("11",l10n.commands.optionTypes[11][locale])
                                    .replace("10",l10n.commands.optionTypes[10][locale])
                                    .replace("9", l10n.commands.optionTypes[9][locale])
                                    .replace("8", l10n.commands.optionTypes[8][locale])
                                    .replace("7", l10n.commands.optionTypes[7][locale])
                                    .replace("6", l10n.commands.optionTypes[6][locale])
                                    .replace("5", l10n.commands.optionTypes[5][locale])
                                    .replace("4", l10n.commands.optionTypes[4][locale])
                                    .replace("3", l10n.commands.optionTypes[3][locale])
                                    .replace("2", l10n.commands.optionTypes[2][locale])
                                    .replace("1", l10n.commands.optionTypes[1][locale])}` +
                                `\n\t${l10n.commands.required[locale]}: ${option.required ? l10n.commands.yesEmote[locale] : l10n.commands.noEmote[locale]} ` +
                                `${option.choices ? `\n\t${l10n.commands.choices[locale]}: ${l10n.commands.yesEmote[locale]}` : ""} ` +
                                `${option.autocomplete ? `\n\t${l10n.commands.autocomplete[locale]}: ${l10n.commands.yesEmote[locale]}` : ""} \n\n`;
                        });
                    }

                    embed.setDescription(
                        
                            `${cmdjson.data.options.length > 1 ? `**${l10n.commands.arguments.plural[locale]}**:` : `**${l10n.commands.arguments.singular[locale]}**:`} \n\`\`\`${options}\`\`\``
                            
                        
                    );
                } else {
                    embed.setDescription(
                        `**${l10n.commands.arguments.plural[locale]}**: \n\`\`\`${l10n.commands.none[locale]}\`\`\``
                    );
                }

                embed
                    .setFooter({
                        text: interaction.guild.name,
                        iconURL: iconurl,
                    })
                    .setTimestamp();

                interaction.reply({ embeds: [embed] });
            });
        });
    }
    return;
};
