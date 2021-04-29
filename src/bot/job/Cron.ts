import { MessageEmbed } from "discord.js";
import * as NodeCron from "node-cron";
import Bot from "./../Bot";

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

		const cronGreeting = async () => {
			const channels = await this._bot.getChannels();
			for (const { guildId, channelId } of channels) {
				this._bot
					.sendMessage(guildId, channelId, embed)
					.then(() => console.log(`Successfully notified: { guildId: ${guildId}, channelId: ${channelId} }`))
					.catch((e) => console.log(`Could not notify: { guildId: ${guildId}, channelId: ${channelId} }\n`, e));
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
		NodeCron.schedule("0 0 9 * * 4", () => cronGreeting(), { timezone: "America/Argentina/Buenos_Aires" });

		console.log("Cron successfully initialized.");
	}
}
