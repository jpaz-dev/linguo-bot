const Discord = require("discord.js");
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();
const client = new Discord.Client();
const PREFIX = "!";
let channels = [];

const greeting = async ({ guildId, channelId }) => {
	const guild = await client.guilds.fetch(guildId, false, true);
	if (!guild) {
		console.log("Not guild found");
		return;
	}

	const channel = guild.channels.cache.find((ch) => ch.id === channelId);
	if (!channel) {
		console.log("Not channel found");
		return;
	}

	const attachement = new Discord.MessageAttachment(
		"https://media1.tenor.com/images/28fc963091e05e1deb32e096c28f040f/tenor.gif?itemid=18184379",
		"asuka.gif"
	);

	channel.send("¡Feliz Jueves!", attachement);
};

client.on("message", (message) => {
	if (message.author.bot) return;

	if (!message.content.startsWith(PREFIX)) return;

	const commandBody = message.content.slice(PREFIX.length);
	const args = commandBody.split(" ");
	const command = args.shift().toLowerCase();

	console.log("Command: ", command);

	switch (command) {
		case "asuka":
			greeting({ guildId: message.guild.id, channelId: message.channel.id });
			break;
		case "add_channel":
			if (channels.filter((g) => g.channelId === message.channel.id).length === 0) {
				channels.push({ guildId: message.guild.id, channelId: message.channel.id });
				message.reply("Ok");
				console.log(channels);
			}
			break;
		case "remove_channel":
			channels = channels.filter((g) => g.channelId !== message.channel.id);
			message.reply("Ok");
			console.log(channels);
	}
});

client.login(process.env.BOT_TOKEN).then(async () => {
	const timezone = { timezone: "America/Argentina/Buenos_Aires" };

	const cronGreeting = () => {
		for (const channel of channels) {
			greeting(channel);
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
	cron.schedule("0 0 9 * * 4", () => cronGreeting(), timezone);

	console.log("The bot initialized successfully");
});
