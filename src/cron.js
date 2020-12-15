const Bot = require("./bot");
const cron = require("node-cron");
const { greeting } = require("./commands/greeting");

module.exports.cron = () => {
	console.log("Starting cron...");

	const cronGreeting = () => {
		for (const ch of Bot.channels) {
			greeting({
				sendAttachement: (text, attachement) => {
					Bot.sendAttachement(ch.guildId, ch.channelId, text, attachement);
				},
			});
		}
	};

	//  * * * * * *
	//  | | | | | |_ day of week
	//  | | | | |___ month
	//  | | | |_____ day of month
	//  | | |_______ hour
	//  | |_________ minute
	//  |___________ second (optional)
	//
	cron.schedule("0 0 9 * * 4", () => cronGreeting(), { timezone: "America/Argentina/Buenos_Aires" });

	console.log("Cron successfully initialized.");
};
