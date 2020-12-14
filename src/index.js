const Discord = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Discord.Client();

const prefix = "!";

client.on("message", (message) => {
	if (message.author.bot) return;

	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(" ");
	const command = args.shift().toLowerCase();

	if (command === "saludar") {
		message.reply(`Hola ${message.author.username}! :)`);
	}

	console.log(message);
});

client.login(process.env.BOT_TOKEN).then(() => console.log("Bot is up"));
