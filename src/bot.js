const Discord = require("discord.js");
const { greeting } = require("./commands/greeting");
require("dotenv").config();

const client = new Discord.Client();
const PREFIX = "!";
let channels = [];
let commands = {};

const addCommand = (command, cb) => {
	let callbacks = !!commands[command] ? commands[command] : [];
	callbacks.push(cb);
	commands[command] = callbacks;
};

const sendMessage = async (guildId, channelId, message) => {
	const guild = await client.guilds.fetch(guildId, false, true);
	if (!guild) {
		console.log("Not guild found.");
		return;
	}

	const channel = guild.channels.cache.find((ch) => ch.id === channelId);
	if (!channel) {
		console.log("Not channel found.");
		return;
	}

	channel.send(message);
};

const sendAttachement = async (guildId, channelId, title, attachement) => {
	const guild = await client.guilds.fetch(guildId, false, true);
	if (!guild) {
		console.log("Not guild found.");
		return;
	}

	const channel = guild.channels.cache.find((ch) => ch.id === channelId);
	if (!channel) {
		console.log("Not channel found.");
		return;
	}

	channel.send(title || "", { files: [attachement] });
};

const start = async () => {
	try {
		await client.login(process.env.BOT_TOKEN);
		console.log("The bot initialized successfully.");
	} catch (e) {
		console.log(e);
		throw Error("The bot failed to initialize.");
	}
};

client.on("message", (message) => {
	if (message.author.bot) return;

	if (!message.content.startsWith(PREFIX)) return;

	const commandBody = message.content.slice(PREFIX.length);
	const args = commandBody.split(" ");
	const command = args.shift().toLowerCase();

	console.log(`Command: ${command}`);

	const cbs = commands[command];

	if (!cbs) {
		message.reply("Command not found.");
		return;
	}

	for (const cb of cbs) {
		cb({
			channelId: message.channel.id,
			guildId: message.guild.id,
			reply: (text) => message.reply(text),
			sendAttachement: (title, attachement) => sendAttachement(message.guild.id, message.channel.id, title, attachement),
			sendMessage: (text) => sendMessage(message.guild.id, message.channel.id, text),
		});
	}
});

module.exports = {
	addCommand,
	channels,
	client,
	commands,
	sendAttachement,
	sendMessage,
	start,
};
