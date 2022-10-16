const { Listener } = require('@sapphire/framework');

class UserEvent extends Listener {
	constructor(context) {
		super(context, {
			once: false,
			event: 'interactionCreate'
		});
	}

	async run(interaction) {
		if (!interaction.isCommand()) return;
		const command = this.container.stores.get('commands').get(interaction.commandName);
		if (!command) return;
		await command.execute(interaction);
	}
}

exports.UserEvent = UserEvent;
