module.exports = {
    commands: ['pi', 'π'],
    expectedArgs: '[number of digits] [hexadecimal]',
    permissionError: '',
    minArgs: 0,
    maxArgs: 2,
    cooldown: null,
    description: "returns π to the specified number of digits. If no number of digits is specified, returns π to 16 digits. Max digits in base 10 are 100000000000000, in base 16 are 83048202372185. https://pi.delivery/",
    callback: (message, arguments, text) => {

        if (arguments[1] == true.toString()) {
            base = 16
        } else {
            base = 10
        }

        if (!arguments[0]) {
            digits = 16
        } else {
            digits = +arguments[0]
        }

        if (Number.isNaN(digits)) return message.reply(`\`${arguments[0].substring(0, 1000)}\` is not a number`)

        message.reply("*working on it*").then(msg => {
            async function parse(response) {
                const text = await response.text()
                try {
                    return JSON.parse(text)
                } catch {
                    return { error: text }
                }
            }


            // plus 1000 digits
            if (digits > 1000) {
                fetch(`https://api.pi.delivery/v1/pi?start=${digits}&numberOfDigits=1000&radix=${base}`)
                    .then(async response => {
                        const res = await parse(response)
                        if (res.error) msg.edit("Error: \n`" + res.error + "`\n")

                        if (!res.content) return
                        if (res.content) {
                            const string = (`${res.content.length} ` + (res.content.length > 1 ? "digits" : "digit") + ` digits of pi, starting from the ${digits}th digit (base ${base}): \n\`${res.content}\``)
                            msg.edit(string)
                        }
                    })
                return
            }

            // sub 1001 digits
            fetch(`https://api.pi.delivery/v1/pi?start=0&numberOfDigits=${digits}&radix=${base}`)
                .then(async response => {
                    const res = await parse(response)
                    if (res.error) msg.edit("Error: \n`" + res.error + "`\n")

                    if (!res.content) return
                    if (res.content) {
                        const string = (`${digits} ` + (digits == 1 ? "digit" : "digits") + ` of pi (base ${base}): \n\`${res.content.slice(0, 1) + (res.content.length >= 2 ? ",": "") + res.content.slice(1)}\``)
                        msg.edit(string)
                    }
                })
            return
        })





    },
    permissions: [],
    requiredRoles: ['Mitglied']
}