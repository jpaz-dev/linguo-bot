import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { CommandHandlerArgs } from "../CommandHandler";
import { getUrl } from "./api";
import TenorSearch from "./TenorResult";

export default class TenorManager {
	searchImage = async ({ args, sendMessage }: CommandHandlerArgs) => {
		const res = await fetch(getUrl(args.join(" "), 1));
		const result: TenorSearch = await res.json();
		const link = result?.results[0]?.media[0]?.gif?.url;
		const title = result?.results[0]?.title;

		if (link) {
			const embed = new MessageEmbed();
			embed.setImage(link);
			embed.setTitle(title);
			sendMessage(embed);
		}
	};
}
