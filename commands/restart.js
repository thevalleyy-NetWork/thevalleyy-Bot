const process = require('process');
const { spawn } = require('child_process');

module.exports = {
    commands: ['restart'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    cooldown: null,
    description: "Lädt den Bot neu",
    callback: async(message, arguments, text) => {
        // const iconurl = message.guild.iconURL()
        // const modlog = '822575095721099304'

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

    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}