const cron = require("node-cron");

module.exports.cron = () => {
	console.log("Starting cron...");

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
