const cmdJson = require('../data/CMDoptions.json')
const fs = require('fs')

module.exports = (client) => {
    fs.rm('./data/cmdinfo', { recursive: true }, (err) => {
        if (err) console.log(err)

        fs.mkdir('./data/cmdinfo', (err) => {
            if (err) console.log(err)
            Object.keys(cmdJson.cmds).forEach(commandFile => {
                const commands = cmdJson.cmds[commandFile].commands
                const expectedArgs = cmdJson.cmds[commandFile].expectedArgs
                const permissionError = cmdJson.cmds[commandFile].permissionError
                const minArgs = cmdJson.cmds[commandFile].minArgs
                const maxArgs = cmdJson.cmds[commandFile].maxArgs
                const cooldown = cmdJson.cmds[commandFile].cooldown
                const description = cmdJson.cmds[commandFile].description
                const permissions = cmdJson.cmds[commandFile].permissions
                const requiredRoles = cmdJson.cmds[commandFile].requiredRoles
    
    
                const cmdpattern = `${JSON.stringify({commands, expectedArgs, permissionError, minArgs, maxArgs, cooldown, description, permissions, requiredRoles}, null, 2)}`
    
                //create a file for every new command
                setTimeout(() => {
                    fs.writeFile(`./data/cmdinfo/@${commands.toString().replaceAll(",",";")}.json`, cmdpattern, function(err) {
                        if (err) console.log(err)
                    });
                
                }, 1000)
        })
    })
})
}