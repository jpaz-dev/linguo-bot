"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Bot_1 = __importDefault(require("./bot/Bot"));
const Cron_1 = __importDefault(require("./Cron"));
const ImageManager_1 = __importDefault(require("./ImageManager"));
const bot = new Bot_1.default();
const imageManager = new ImageManager_1.default(bot);
bot.addCommand("asuka", ({ sendMessage }) => {
    const embed = new discord_js_1.MessageEmbed();
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
bot.client.on("ready", () => {
    const cron = new Cron_1.default(bot);
    cron.start();
});
bot.start();
//# sourceMappingURL=index.js.map