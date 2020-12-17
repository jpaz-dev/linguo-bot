"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class ImageManager {
    constructor(bot) {
        this.getImage = ({ command, sendMessage }) => {
            const image = this._images[command];
            if (image) {
                const embed = new discord_js_1.MessageEmbed();
                embed.setImage(image.link);
                embed.setTitle(image.title);
                sendMessage(embed);
            }
        };
        this.addImage = ({ args, reply }) => {
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
        this.removeImage = ({ args, reply }) => {
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
        this._bot = bot;
        this._images = new Map();
    }
}
exports.default = ImageManager;
//# sourceMappingURL=ImageManager.js.map