const Bot = require("../bot");
const Discord = require("discord.js");

let images = {};

const getImage = ({ command, sendMessage }) => {
	const image = images[command];

	if (image) {
		const embed = new Discord.MessageEmbed();
		embed.setImage(image.link);
		embed.setTitle(image.title);
		sendMessage(embed);
	}
};

module.exports.addImage = ({ args, reply }) => {
	if (!args || !args[0] || args[0].length === 0 || !args[1] || args[1].length === 1) {
		reply("Invalid arguments.");
		return;
	}

	if (!!Bot.commands[args[0]]) {
		reply("There is already a command with that name.");
		return;
	}

	images[args[0]] = { link: args[1], name: args[0], title: args.slice(2).join(" ") };

	Bot.addCommand(args[0], (props) => getImage(props));

	reply("Ok");
};

module.exports.removeImage = ({ args, reply }) => {
	if (!args || !args[0] || args[0].length === 0) {
		reply("Invalid arguments.");
		return;
	}

	if (!images[args[0]]) {
		reply("There is no image with that name.");
		return;
	}

	Bot.commands[args[0]] = null;
	images[args[0]] = null;

	reply("Ok");
};
