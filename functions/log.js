const isJson = require("./isJson.js");
const gettime = require("./gettime.js");

function log(text, style = "reset", background = "reset", showTime = true) {
    if (isJson(text)) return console.log(text);
    const styles = {
        text: {
            reset: "\x1b[0m",
            bold: "\x1b[1m",
            dim: "\x1b[2m",
            underscore: "\x1b[4m",
            blink: "\x1b[5m",
            reverse: "\x1b[7m",
            hidden: "\x1b[8m",
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
            crimson: "\x1b[38m",
        },
        background: {
            reset: "\x1b[0m",
            black: "\x1b[40m",
            red: "\x1b[41m",
            green: "\x1b[42m",
            yellow: "\x1b[43m",
            blue: "\x1b[44m",
            magenta: "\x1b[45m",
            cyan: "\x1b[46m",
            white: "\x1b[47m",
            crimson: "\x1b[48m",
        },
    };

    if (styles.text[style.toLowerCase()]) {
        var fgColor = styles.text[style];
    } else {
        throw "Invalid text style";
    }

    if (styles.background[background.toLowerCase()]) {
        var bgColor = styles.background[background];
    } else {
        throw "Invalid background style";
    }

    console.log(
        `${bgColor}${
            showTime == true ? `[${gettime()}] » ` : ""
        }${fgColor}${text}${styles.text.reset}`
    );
}
module.exports = log;
