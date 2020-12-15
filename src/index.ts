import { MessageEmbed } from "discord.js";
import Bot from "./bot/Bot";
import Cron from "./Cron";
import ImageManager from "./ImageManager";
import TenorManager from "./tenor/TenorManager";

const bot = new Bot();
const imageManager = new ImageManager(bot);
const tenorManager = new TenorManager();

bot.addCommand("asuka", ({ sendMessage }) => {
	const embed = new MessageEmbed();
	embed.setImage("https://media1.tenor.com/images/28fc963091e05e1deb32e096c28f040f/tenor.gif?itemid=18184379");
	embed.setTitle("¡Feliz Jueves!");
	sendMessage(embed);
});

bot.addCommand("add_channel", ({ guildId, channelId, reply }) => {
	if (bot.existChannel(guildId, channelId)) {
		reply("Channel already added.");
	}

	bot.addChannel(guildId, channelId);
	reply("Ok");
});

bot.addCommand("remove_channel", ({ guildId, channelId, reply }) => {
	if (!bot.existChannel(guildId, channelId)) {
		reply("Not channel found.");
	}

	bot.removeChannel(guildId, channelId);
	reply("Ok");
});

bot.addCommand("add_image", (args) => imageManager.addImage(args));

bot.addCommand("remove_image", (args) => imageManager.removeImage(args));

bot.addCommand("search_image", (args) => tenorManager.searchImage(args));

bot.client.on("ready", () => {
	const cron = new Cron(bot);
	cron.start();
});

bot.start();
