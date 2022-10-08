const Discord = require("discord.js");
const config = require("../../config.json");
const mysql = require("mysql2");
const util = require("util");

const connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});

var db = util.promisify(connection.query).bind(connection);

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply("test");
    client.modLog("sus", "test.js");

    // 		// import node-fetch
    // const fetch = require('node-fetch');
    // // set url as constant
    // const URL = 'https://jsonplaceholder.typicode.com/todos';

    // fetch(URL)
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(err => console.error(err));

    // 		const https = require('https');
    // 		const options = {
    // 		  hostname: 'jsonplaceholder.typicode.com',
    // 		  port: 443,
    // 		  path: '/todos',
    // 		  method: 'GET',
    // 		};

    // 		const req = https.request(options, res => {
    // 		  console.log(`statusCode: ${res.statusCode}`);

    // 		  res.on('data', d => {
    // 			process.stdout.write(d);
    // 		  });
    // 		});

    // 		req.on('error', error => {
    // 		  console.error(error);
    // 		});

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
};
