import { MessageEmbed } from "discord.js";
import "reflect-metadata";
import Bot from "./bot/Bot";
import Cron from "./bot/job/Cron";
import DatabaseConfig from "./config/DatabaseConfig";
import ImageManager from "./bot/ImageManager";
import TenorManager from "./bot/tenor/TenorManager";

const bot = new Bot();
const imageManager = new ImageManager(bot);
const tenorManager = new TenorManager();
const databaseconfig = new DatabaseConfig();

bot.addCommand("asuka", ({ sendMessage }) => {
	const embed = new MessageEmbed();
	embed.setImage("https://media1.tenor.com/images/28fc963091e05e1deb32e096c28f040f/tenor.gif?itemid=18184379");
	embed.setTitle("¡Feliz Jueves!");
	sendMessage(embed);
});

bot.addCommand("add_channel", ({ guildId, channelId, reply }) => {
	bot.addChannel(guildId, channelId)
		.then(() => reply("Ok"))
		.catch((e: Error) => reply(e.message));
});

bot.addCommand("remove_channel", ({ guildId, channelId, reply }) => {
	bot.removeChannel(guildId, channelId)
		.then(() => reply("Ok"))
		.catch((e: Error) => reply(e.message));
});

bot.addCommand("add_image", (args) => imageManager.addImage(args));

bot.addCommand("remove_image", (args) => imageManager.removeImage(args));

bot.addCommand("search_image", (args) => tenorManager.searchImage(args));

bot.client.on("ready", () => {
	const cron = new Cron(bot);
	cron.start();
});

databaseconfig.connect().then(async () => {
	bot.start();
});
