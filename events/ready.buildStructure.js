const cmdJson = require('../data/cmdstructure.json')
const fs = require('fs')

module.exports = (client) => {
    fs.rm('./data/cmd-json', { recursive: true }, (err) => {
        if (err) console.log(err)

        fs.mkdir('./data/cmd-json', (err) => {
            if (err) console.log(err)
            Object.keys(cmdJson.cmds).forEach(command => {
                const cooldown = cmdJson.cmds[command].cooldown
                const name = cmdJson.cmds[command].data.name
                const description = cmdJson.cmds[command].data.description
                const descriptionEn = cmdJson.cmds[command].data.description_localizations
                const options = cmdJson.cmds[command].data.options
                const permission = cmdJson.cmds[command].data.default_member_permissions  
                const dm = cmdJson.cmds[command].data.dm_permission
    
    
                const pattern = `${JSON.stringify({cooldown, name, description, descriptionEn, options, permission, dm}, null, 2)}`
    
                //create a file for every new command
                setTimeout(() => {
                    fs.writeFile(`./data/cmd-json/@${name}.json`, pattern, function(err) {
                        //ERROR
                        if (err) console.log(err)
                    });
                
                }, 1000)
        })
    })
})
}