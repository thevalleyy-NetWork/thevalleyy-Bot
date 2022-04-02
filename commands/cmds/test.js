const config = require('../../config.json');
const Discord = require('discord.js')
const mysql = require('mysql')
const util = require('util')

var connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

var db = util.promisify(connection.query).bind(connection)

module.exports = {
    commands: ['test', 'test2'],
    expectedArgs: '',
    permissionError: 'Diese Nachricht sollte es nie geben',
    minArgs: 0,
    maxArgs: 0,
    cooldown: 0,
    description: "this description is weird",
    callback: async(message, arguments, text) => {





        // const res = await db(`SELECT dctag FROM discord WHERE id = 32`)
        // await message.reply(decodeURI(res[0].dctag))


        // const members = message.guild.members.cache
        // members.forEach(async member => {
        //     await db(`INSERT INTO discord (dcid, dctag, joindate, oldestjoindate) VALUES (${member.id}, '${await encodeURI(member.user.tag.replaceAll("'", " "))}', ${Date.now()}, ${Date.now()})`)
        //     console.log(`Registering: ${member.user.tag}`)
        // });

        // if (await db(`SELECT dcid FROM discord WHERE dcid = ${message.author.id}`).then(res => res[0])) {
        //     message.reply("Du bist registriert!")
        // } else {
        //     message.reply("Du bist nicht registriert!")
        // }


        // connection.getConnection(function(err, connection) {

        //     // Use the connection
        //     connection.query('SELECT * FROM discord', function(error, results, fields) {
        //         console.log(results)
        //             // When done with the connection, release it.
        //         connection.release();

        //         // Handle error after the release.
        //         if (error) console.log(error);

        //         // Don't use the connection here, it has been returned to the pool.
        //     });
        // });
    },
    permissions: [],
    requiredRoles: ['thevalleyy']
}