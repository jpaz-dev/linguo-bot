const Discord = require("discord.js");
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN).then(async () => {
	const guild = await client.guilds.fetch(process.env.GUILD_ID, false, true);
	if (!guild) {
		console.log("Not guild found");
		return;
	}

	const channel = guild.channels.cache.find((ch) => ch.id === process.env.CHANNEL_ID);
	if (!channel) {
		console.log("Not channel found");
		return;
	}

	const greeting = () => {
		const attachement = new Discord.MessageAttachment(
			"https://media1.tenor.com/images/28fc963091e05e1deb32e096c28f040f/tenor.gif?itemid=18184379",
			"asuka.gif"
		);
		channel.send("¡Feliz Jueves!", attachement);
	};

	//  * * * * * *
	//  | | | | | |_ day of week
	//  | | | | |___ month
	//  | | | |_____ day of month
	//  | | |_______ hour
	//  | |_________ minute
	//  |___________ second (optional)
	//
	cron.schedule("0 0 9 * * 4", () => greeting(), { timezone: "America/Argentina/Buenos_Aires" });
});
