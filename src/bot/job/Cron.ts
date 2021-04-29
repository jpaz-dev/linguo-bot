import { MessageEmbed } from "discord.js";
import * as NodeCron from "node-cron";
import Bot from "./../Bot";
import { WeekDay, WeekImage, getGreetingImage } from "./../tenor/WeekImage";

export default class Cron {
	private _bot: Bot;

	constructor(bot: Bot) {
		this._bot = bot;
	}

	start() {
		console.log("Starting cron...");

		const greeting = async ({ title, url }: WeekImage) => {
			const embed = new MessageEmbed();
			embed.setImage(url);
			embed.setTitle(title);
			
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
		//	| |_________ minute
		//	|___________ second (optional)
		//
		NodeCron.schedule("0 0 10 * * 1", () => greeting(getGreetingImage(WeekDay.Monday)), { timezone: "America/Argentina/Buenos_Aires" });
		NodeCron.schedule("0 0 10 * * 2", () => greeting(getGreetingImage(WeekDay.Tuesday)), { timezone: "America/Argentina/Buenos_Aires" });
		NodeCron.schedule("0 0 10 * * 3", () => greeting(getGreetingImage(WeekDay.Wednesday)), { timezone: "America/Argentina/Buenos_Aires" });
		NodeCron.schedule("0 0 10 * * 4", () => greeting(getGreetingImage(WeekDay.Thursday)), { timezone: "America/Argentina/Buenos_Aires" });
		NodeCron.schedule("0 0 10 * * 5", () => greeting(getGreetingImage(WeekDay.Friday)), { timezone: "America/Argentina/Buenos_Aires" });

		console.log("Cron successfully initialized.");
	}
}
