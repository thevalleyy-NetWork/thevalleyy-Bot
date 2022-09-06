const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     
    if (interaction.user.id != config.owner) {
        interaction.reply({content: 'Du hast keine Berechtigung, diesen Befehl auszuführen.', ephemeral: true})
        return;
    }

    let kill = []
        let m
        let exited
        const getLines = d => d.split(/(\r?\n)+/).join("")

        if (interaction.user) {
            await interaction.reply("```xl\n" + interaction.options.getString('code') + "\n```")
            m = await interaction.fetchReply()
        } else m = await interaction.reply("```xl\n" + interaction.options.getString('code') + "\n```")

        const update = () => {
            const text = interaction.options.getString('code') + "\n\n" + getLines(data.join("")) + "\n" + (exited ? exited : "")
            if (interaction.user) interaction.editReply("```xl\n" + text.substring(0, 1960).trim() + (text.length > 1959 ? "\n..." : "") + "\n"  + "```").catch(() => {})
            else m.edit("```xl\n" + text.substring(0, 1960).trim() + (text.length > 1959 ? "\n..." : "") + "\n"  + "```").catch(() => {})
            if (text.length > 2000) kill.push(true)
        }

        const { spawn } = require("child_process")
        const child = spawn(interaction.options.getString('code'), {
            shell: true
        })
        let data = []
        const handler = (d) => {
            data.push(d.toString())
            update()

            if (kill[0] == true) {
                child.kill("SIGKILL")
            }
        }

        child.stdout.on("data", handler)
        child.stderr.on("data", handler)
        child.stdout.on("error", handler)
        child.stderr.on("error", handler)
        child.on("error", handler)

        child.on("exit", (code, signal) => {
            let d = "Beendet mit Code "

            function string(t) {
                return d += t.toString()
            }

            if (signal == null) {
                exited = string(code)
                update()
            } else {
                exited = string(signal)
                update()
            }

        })


}