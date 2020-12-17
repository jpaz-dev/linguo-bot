import { MessageEmbed } from "discord.js";
import Bot from "./bot/Bot";
import { CommandHandlerArgs } from "./bot/CommandHandler";
import { DiscordImage } from "./entity/DiscordImage";

export default class ImageManager {
	private _bot: Bot;
	private _images: Map<string, string>;

	constructor(bot: Bot) {
		this._bot = bot;
		this._images = new Map();
	}

	private getImage = async ({ command, guildId, channelId, sendMessage }: CommandHandlerArgs) => {
		const image = await DiscordImage.findOne({ where: { name: command, guildId, channelId } });

		if (image) {
			const embed = new MessageEmbed();
			embed.setImage(image.link);
			embed.setTitle(image.title);
			sendMessage(embed);
		}
	};

	addImage = async ({ args, channelId, guildId, reply }: CommandHandlerArgs) => {
		if (!args || !args[0] || args[0].length === 0 || !args[1] || args[1].length === 1) {
			reply("Invalid arguments.");
			return;
		}

		if (this._bot.existCommand(args[0])) {
			reply("There is already a command with that name.");
			return;
		}

		const image = new DiscordImage();
		image.guildId = guildId;
		image.channelId = channelId;
		image.name = args[0];
		image.link = args[1];
		image.title = args.slice(2).join(" ");

		await image.save();

		this._bot.addCommand(args[0], (props) => this.getImage(props));

		reply("Ok");
	};

	removeImage = async ({ args, guildId, channelId, reply }: CommandHandlerArgs) => {
		if (!args || !args[0] || args[0].length === 0) {
			reply("Invalid arguments.");
			return;
		}

		try {
			await DiscordImage.delete({ name: args[0], guildId, channelId });
			this._bot.removeCommand(args[0]);
			reply("Ok");
		} catch (e) {
			reply(e?.message);
		}
	};
}
