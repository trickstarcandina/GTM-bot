const { Listener } = require('@sapphire/framework');

class UserEvent extends Listener {
	constructor(context) {
		super(context, {
			once: false,
			event: 'messageCreate'
		});
	}

	async run(message) {
		if (message.author.bot) {
			return;
		}
	}
}

exports.UserEvent = UserEvent;
