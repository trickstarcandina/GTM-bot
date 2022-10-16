require('./lib/setup');
require('dotenv').config({ path: './src/.env' });
const { LogLevel, err } = require('@sapphire/framework');
const WynnClient = require('./lib/Structures/WynnClient');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

//get ip
var http = require('http');

const commands = [];
for (const folder of fs.readdirSync('./src/commands')) {
	if (folder.toString() === 'ownerBot') continue;
	const commandFiles = fs.readdirSync('./src/commands/' + folder.toString()).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`../src/commands/${folder.toString()}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const client = new WynnClient({
	defaultPrefix: process.env.PREFIX,
	regexPrefix: RegExp('(^(hey +)?bot[,! ])|(' + process.env.PREFIX.toString().toLocaleUpperCase() + ')'),
	//regexPrefix/i,
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true,
	defaultCooldown: {
		delay: 5000
	},
	logger: {
		level: LogLevel.Debug
	},
	partials: ['CHANNEL'],
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS'
	]
});

const main = async () => {
	try {
		//get ip
		http.get({ host: 'api.ipify.org', port: 80, path: '/' }, function (resp) {
			resp.on('data', function (ip) {
				console.log('My public IP address is: ' + ip);
			});
		});
		client.logger.info('Logging in');
		await client.login(process.env.TOKEN);
		client.logger.info('logged in');
		//register slash
		console.log('Started refreshing application (/) commands.');
		await rest.put(Routes.applicationCommands(process.env.APP_ID), {
			body: commands
		});
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
