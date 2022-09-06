const Discord = require('discord.js');
const config = require('../../config.json');
const process = require('process');
const { spawn } = require('child_process');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
     
    if (interaction.user.id != config.owner) {
        interaction.reply({content: 'Du hast keine Berechtigung, diesen Befehl auszuführen.', ephemeral: true})
        return;
    }

    (function main() {
        if (process.env.process_restarting) {
          delete process.env.process_restarting;
          // Give old process one second to shut down before continuing ...
          setTimeout(main, 1000);
          return;
        }
    
        // Restart process ...
        spawn(process.argv[0], process.argv.slice(1), {
          env: { process_restarting: 1 },
          stdio: 'ignore',
          detached: true
        }).unref();
      })();

      process.exit(1)

}