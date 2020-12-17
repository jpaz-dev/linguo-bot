"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
class Bot {
    constructor() {
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.login(process.env.BOT_TOKEN);
                yield this._client.user.setActivity(" -help :D", { type: "LISTENING" });
                console.log("The bot initialized successfully.");
            }
            catch (e) {
                console.log(e);
                throw Error("The bot failed to initialize.");
            }
        });
        this.addCommand = (command, commandHandler) => {
            const callbacks = !!this._commands[command] ? this._commands[command] : [];
            callbacks.push(commandHandler);
            this._commands[command] = callbacks;
        };
        this.sendMessage = (guildId, channelId, message) => __awaiter(this, void 0, void 0, function* () {
            const guild = yield this._client.guilds.fetch(guildId, false, true);
            if (!guild) {
                console.log("Not guild found.");
                return;
            }
            const channel = guild.channels.cache.find((ch) => ch.id === channelId);
            if (!channel) {
                console.log("Not channel found.");
                return;
            }
            channel.send(message);
        });
        this.sendAttachement = (guildId, channelId, title, attachement) => __awaiter(this, void 0, void 0, function* () {
            const guild = yield this._client.guilds.fetch(guildId, false, true);
            if (!guild) {
                console.log("Not guild found.");
                return;
            }
            const channel = guild.channels.cache.find((ch) => ch.id === channelId);
            if (!channel) {
                console.log("Not channel found.");
                return;
            }
            channel.send(title || "", { files: [attachement] });
        });
        dotenv_1.default.config();
        this._client = new discord_js_1.Client();
        this._channels = [];
        this._commands = new Map();
        this._client.on("message", (message) => {
            if (message.author.bot)
                return;
            if (!message.content.startsWith(Bot.PREFIX))
                return;
            const commandBody = message.content.slice(Bot.PREFIX.length);
            const args = commandBody.split(" ");
            const command = args.shift().toLowerCase();
            console.log(`Command: ${command}`);
            const cbs = this._commands[command];
            if (!cbs) {
                message.reply("Command not found.");
                return;
            }
            for (const cb of cbs) {
                cb({
                    args,
                    command,
                    channelId: message.channel.id,
                    guildId: message.guild.id,
                    reply: (text) => message.reply(text),
                    sendAttachement: (title, attachement) => this.sendAttachement(message.guild.id, message.channel.id, title, attachement),
                    sendMessage: (embed) => this.sendMessage(message.guild.id, message.channel.id, embed),
                });
            }
        });
    }
    addChannel(guildId, channelId) {
        if (this.existChannel(guildId, channelId)) {
            throw new Error("Channel already exists.");
        }
        this._channels.push({ guildId, channelId });
    }
    removeChannel(guildId, channelId) {
        if (!this.existChannel(guildId, channelId)) {
            throw new Error("Channel not exists.");
        }
        this._channels = this._channels.filter((ch) => !(ch.guildId === guildId && ch.channelId === channelId));
    }
    removeCommand(command) {
        this._commands[command] = null;
    }
    existChannel(guildId, channelId) {
        return this._channels.filter((ch) => ch.guildId === guildId && ch.channelId === channelId).length === 0;
    }
    existCommand(command) {
        return !!this._commands[command];
    }
    get channels() {
        return this._channels;
    }
    get client() {
        return this._client;
    }
}
exports.default = Bot;
Bot.PREFIX = "!";
//# sourceMappingURL=Bot.js.map