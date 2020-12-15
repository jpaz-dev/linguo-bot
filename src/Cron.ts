import { MessageEmbed } from "discord.js";
import cron from "node-cron";
import Bot from "./Bot";

export default class Cron {
	private _bot: Bot;

	constructor(bot: Bot) {
		this._bot = bot;
	}

	start() {
		console.log("Starting cron...");

		const embed = new MessageEmbed();
		embed.setImage("https://media1.tenor.com/images/28fc963091e05e1deb32e096c28f040f/tenor.gif?itemid=18184379");
		embed.setTitle("¡Feliz Jueves!");

		const cronGreeting = () => {
			for (const { guildId, channelId } of this._bot.channels) {
				this._bot.sendMessage(guildId, channelId, embed);
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
	}
}
