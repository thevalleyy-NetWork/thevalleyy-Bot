const Discord = require('discord.js')

module.exports = {
    commands: ['bettereval', 'beval'],
    expectedArgs: '<code>',
    permissionError: '',
    minArgs: 1,
    maxArgs: null,
    cooldown: null,
    description: "access commandline in seconds",
    callback: async(message, arguments, text) => {

        const iconurl = message.guild.iconURL()

        let kill = []
        let m
        let exited
        const getLines = d => d.split(/(\r?\n)+/).join("")

        if (message.user) {
            await message.reply("```xl\n" + arguments.join(" ") + "\n```")
            m = await message.fetchReply()
        } else m = await message.reply("```xl\n" + arguments.join(" ") + "\n```")

        const update = () => {
            const text = arguments.join(" ") + "\n\n" + getLines(data.join("")) + "\n" + (exited ? exited : "")
            if (message.user) message.editReply("```xl\n" + text.substring(0, 1960).trim() + (text.length > 1959 ? "\n..." : "") + "\n"  + "```").catch(() => {})
            else m.edit("```xl\n" + text.substring(0, 1960).trim() + (text.length > 1959 ? "\n..." : "") + "\n"  + "```").catch(() => {})
            if (text.length > 2000) kill.push(true)
        }

        const { spawn } = require("child_process")
        const child = spawn(arguments.join(" "), {
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


    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}