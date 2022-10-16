const { SapphireClient } = require('@sapphire/framework');

class WynnClient extends SapphireClient {
	constructor(options) {
		super({
			...options,
			i18n: {
				defaultMissingKey: 'missing',
				defaultNS: 'default',
				i18next: {
					preload: ['en-US', 'vi-VN'],
					load: 'currentOnly',
					lowerCaseLng: false,
					fallbackLng: 'en-US',
					initImmediate: false,
					interpolation: {
						escapeValue: false
					}
				},
				fetchLanguage: async ({ guild }) => {
					return 'vi-VN';
				}
			}
		});
	}
}
module.exports = WynnClient;
