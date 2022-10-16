const { container } = require('@sapphire/framework');
const { createCaptcha } = require('../../utils/index');
const utils = require('../../lib/utils');

module.exports.fetchPrefix = async function fetchPrefix(message) {
	if (message.guild === null) return process.env.PREFIX;
	const guild = await this.db.fetchGuild(message.guild.id);
	return guild.prefix;
};