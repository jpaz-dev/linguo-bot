import { MessageEmbed } from "discord.js";
import Bot from "./Bot";
import { CommandHandlerArgs } from "./types/BotProps";

export default class ImageManager {
	private _bot: Bot;
	private _images: Map<string, string>;

	constructor(bot: Bot) {
		this._bot = bot;
		this._images = new Map();
	}

	private getImage = ({ command, sendMessage }: CommandHandlerArgs) => {
		const image = this._images[command];

		if (image) {
			const embed = new MessageEmbed();
			embed.setImage(image.link);
			embed.setTitle(image.title);
			sendMessage(embed);
		}
	};

	addImage = ({ args, reply }: CommandHandlerArgs) => {
		if (!args || !args[0] || args[0].length === 0 || !args[1] || args[1].length === 1) {
			reply("Invalid arguments.");
			return;
		}

		if (this._bot.existCommand(args[0])) {
			reply("There is already a command with that name.");
			return;
		}

		this._images[args[0]] = { link: args[1], name: args[0], title: args.slice(2).join(" ") };

		this._bot.addCommand(args[0], (props) => this.getImage(props));

		reply("Ok");
	};

	removeImage = ({ args, reply }: CommandHandlerArgs) => {
		if (!args || !args[0] || args[0].length === 0) {
			reply("Invalid arguments.");
			return;
		}

		if (!this._images[args[0]]) {
			reply("There is no image with that name.");
			return;
		}

		this._bot.removeCommand(args[0]);
		this._images[args[0]] = null;

		reply("Ok");
	};
}
