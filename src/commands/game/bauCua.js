const WynnCommand = require('../../lib/Structures/WynnCommand');
const { send } = require('@sapphire/plugin-editable-commands');
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

const emoji = require('../../config/emoji');
const dices = {
	bau: emoji.game.baucua.bau,
	cua: emoji.game.baucua.cua,
	ca: emoji.game.baucua.ca,
	ga: emoji.game.baucua.ga,
	tom: emoji.game.baucua.tom,
	nai: emoji.game.baucua.nai
};
const loadEmoji = emoji.game.baucua.load;

class UserCommand extends WynnCommand {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'baucua',
			aliases: ['bc', 'baucua'],
			description: 'commands/baucua:description',
			usage: 'commands/baucua:usage',
			example: 'commands/baucua:example',
			cooldownDelay: 25000
		});
	}

	async messageRun(message, args) {
		return await this.randomBauCua(message);
	}

	async randomBauCua(message) {
		let randDices = [];
		while (randDices.length < 3) {
			randDices.push(Math.floor(Math.random() * 6));
		}
		let result1 = convertEmoji(randDices[0], dices);
		let result2 = convertEmoji(randDices[1], dices);
		let result3 = convertEmoji(randDices[2], dices);
		let lastResult = await send(message, loadEmoji + ' ' + loadEmoji + ' ' + loadEmoji);
		await wait(1111);
		await lastResult.edit(result1 + ' ' + loadEmoji + ' ' + loadEmoji);
		await wait(2222);
		await lastResult.edit(result1 + ' ' + loadEmoji + ' ' + result3);
		await wait(3333);
		return await Promise.all([
			lastResult.edit(result1 + ' ' + result2 + ' ' + result3),
			message.channel.send('**' + convertName(randDices[0]) + ' ✧ ' + convertName(randDices[1]) + ' ✧ ' + convertName(randDices[2]) + '**')
		]);
	}

	async execute(interaction) {
		return await this.randomBauCua(interaction);
	}
}

function convertEmoji(x, dices) {
	if (x == 0) return dices.bau;
	if (x == 1) return dices.cua;
	if (x == 2) return dices.ca;
	if (x == 3) return dices.ga;
	if (x == 4) return dices.tom;
	if (x == 5) return dices.nai;
}

function convertName(x) {
	switch (x) {
		case 0:
			return 'Bầu';
		case 1:
			return 'Cua';
		case 2:
			return 'Cá';
		case 3:
			return 'Gà';
		case 4:
			return 'Tôm';
		case 5:
			return 'Nai';
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('baucua')
		.setDescription('Game Fish 🐟 Shrimp 🦐 Crab 🦀')
		.addIntegerOption((option) => option.setName('betmoney').setDescription('Enter an integer').setRequired(true)),
	UserCommand
};
