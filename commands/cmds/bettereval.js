module.exports = {
    commands: ['bettereval', 'beval'],
    expectedArgs: '<code>',
    permissionError: '',
    minArgs: 1,
    maxArgs: null,
    callback: async(message, arguments, text) => {

        const Discord = require('discord.js')
        var iconurl = message.guild.iconURL({
            dynamic: true
        })


        var m
        let exited
        const getLines = d => d.split(/(\r?\n)+/).join("")

        if (message.user) {
            await message.reply("```xl\n" + arguments.join(" ") + "\n```")
            m = await message.fetchReply()
        } else m = await message.reply("```xl\n" + arguments.join(" ") + "\n```")

        const update = () => {
            const text = arguments.join(" ") + "\n\n" + getLines(data.join("")) + "\n" + (exited ? exited : "")
            if (message.user) message.editReply("```xl\n" + text.substring(0, 1980).trim() + (text.length > 1979 ? "\n..." : "") + "\n```")
            else m.edit("```xl\n" + text.substring(0, 1980).trim() + (text.length > 1979 ? "\n..." : "") + "\n```")
        }

        const { spawn } = require("child_process")
        const child = spawn(arguments.join(" "), {
            shell: true
        })
        let data = []
        const handler = (d) => {
            data.push(d.toString())
            update()
        }

        child.stdout.on("data", handler)
        child.stderr.on("data", handler)
        child.stdout.on("error", handler)
        child.stderr.on("error", handler)
        child.on("error", handler)

        child.on("exit", (code, signal) => {
            let d = "Beendet mit Code "

            function push(t) {
                return d += t.toString()
            }

            if (signal == null) {
                exited = push(code)
                update()
            } else {
                exited = push(signal)
                update()
            }

        })


    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}