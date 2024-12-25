import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import strings from "../localization.json" with {type: "json"};
const localization = strings.slashCommands.qr;

export default {
    cooldown: 30,
    data: new SlashCommandBuilder()
        .setName("qr")
        .setContexts([0])
        .setDescription(localization.description.en)
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .setDescriptionLocalizations({
            "de": localization.description.de,
        })
        .addSubcommand((subcommand) =>
            subcommand
                .setName("generate")
                .setDescription(localization.generate.description.en)
                .setDescriptionLocalizations({
                    "de": localization.generate.description.de
                })
                .addStringOption((option) =>
                    option
                        .setName("data")
                        .setRequired(true)
                        .setDescription(localization.generate.data.en)
                        .setDescriptionLocalizations({
                            "de": localization.generate.data.de
                        })
                )
        )

        .addSubcommand((subcommand) =>
            subcommand
                .setName("scan")
                .setDescription(localization.scan.description.en)
                .setDescriptionLocalizations({
                    "de": localization.scan.description.de
                })
                .addAttachmentOption((option) =>
                    option.setName("qrcode").setRequired(true).setDescription(localization.scan.qrcode.en).setDescriptionLocalizations({
                        "de": localization.scan.qrcode.de
                    })
                )
        ),
};
