"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_cron_1 = __importDefault(require("node-cron"));
class Cron {
    constructor(bot) {
        this._bot = bot;
    }
    start() {
        console.log("Starting cron...");
        const embed = new discord_js_1.MessageEmbed();
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
        node_cron_1.default.schedule("0 0 9 * * 4", () => cronGreeting(), { timezone: "America/Argentina/Buenos_Aires" });
        console.log("Cron successfully initialized.");
    }
}
exports.default = Cron;
//# sourceMappingURL=Cron.js.map