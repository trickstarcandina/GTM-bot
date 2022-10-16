const WynnCommand = require('../../lib/Structures/WynnCommand');
const { send } = require('@sapphire/plugin-editable-commands');
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

const emoji = require('../../config/emoji');
const dices = {
	one: emoji.game.taixiu.one,
	two: emoji.game.taixiu.two,
	three: emoji.game.taixiu.three,
	four: emoji.game.taixiu.four,
	five: emoji.game.taixiu.five,
	six: emoji.game.taixiu.six
};
const loadEmoji = emoji.game.taixiu.dice;

class UserCommand extends WynnCommand {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'taixiu',
			aliases: ['tx', 'taixiu'],
			description: 'tài xỉu',
			usage: '-taixiu',
			example: '-tx',
			cooldownDelay: 15000
		});
	}

	async messageRun(message, args) {
		return await this.randomTaiXiu(message);
	}

	async randomTaiXiu(message) {
		let randDices = [];
		while (randDices.length < 3) {
			randDices.push(Math.floor(Math.random() * 6));
		}
		let result1 = convertEmoji(randDices[0], dices);
		let result2 = convertEmoji(randDices[1], dices);
		let result3 = convertEmoji(randDices[2], dices);
		let lastResult = await message.channel.send(loadEmoji + ' ' + loadEmoji + ' ' + loadEmoji);
		await wait(1111);
		await lastResult.edit(result1 + ' ' + loadEmoji + ' ' + loadEmoji);
		await wait(2222);
		await lastResult.edit(result1 + ' ' + loadEmoji + ' ' + result3);
		await wait(3333);
		let total = randDices[0] + randDices[1] + randDices[2] + 3;
		switch (true) {
			case total < 11 && total % 2 === 0:
				return await Promise.all([lastResult.edit(result1 + ' ' + result2 + ' ' + result3), send(message, `** Xỉu • Chẵn • ${total}**`)]);
			case total < 11 && total % 2 === 1:
				return await Promise.all([lastResult.edit(result1 + ' ' + result2 + ' ' + result3), send(message, `** Xỉu • Lẻ • ${total}**`)]);
			case total > 10 && total % 2 === 0:
				return await Promise.all([lastResult.edit(result1 + ' ' + result2 + ' ' + result3), send(message, `** Tài • Chẵn • ${total}**`)]);
			case total > 10 && total % 2 === 1:
				return await Promise.all([lastResult.edit(result1 + ' ' + result2 + ' ' + result3), send(message, `** Tài • Lẻ • ${total}**`)]);
		}
	}

	async execute(interaction) {
		return await interaction.reply('none');
	}
}

function convertEmoji(x, dices) {
	if (x == 0) return dices.one;
	if (x == 1) return dices.two;
	if (x == 2) return dices.three;
	if (x == 3) return dices.four;
	if (x == 4) return dices.five;
	if (x == 5) return dices.six;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('taixiu')
		.setDescription('Game Tai Xiu')
		.addIntegerOption((option) => option.setName('betmoney').setDescription('Enter an integer').setRequired(true)),
	UserCommand
};
