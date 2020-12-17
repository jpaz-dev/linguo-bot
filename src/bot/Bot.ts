import { Client, TextChannel } from "discord.js";
import * as Dotenv from "dotenv";
import { DiscordChannel } from "../entity/DiscordChannel";
import { CommandHandler } from "./CommandHandler";

export default class Bot {
	private static PREFIX = "!";
	private static COMMAND_PATTERN = /^[a-zA-Z0-9\-_]{3,40}$/;
	private _commands: Map<string, CommandHandler[]>;
	private _client: Client;

	constructor() {
		Dotenv.config();

		this._client = new Client();
		this._commands = new Map();

		this._client.on("message", (message) => {
			if (message.author.bot) return;

			if (!message.content.startsWith(Bot.PREFIX)) return;

			const commandBody = message.content.slice(Bot.PREFIX.length);
			const args = commandBody.split(" ");
			const command = args.shift().toLowerCase();

			console.log(`Command: ${command}`);

			const cbs: CommandHandler[] = this._commands[command];

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

	start = async () => {
		try {
			await this._client.login(process.env.BOT_TOKEN);
			await this._client.user.setActivity(" -help :D", { type: "LISTENING" });
			console.log("The bot initialized successfully.");
		} catch (e) {
			console.log(e);
			throw Error("The bot failed to initialize.");
		}
	};

	addCommand = (command: string, commandHandler: CommandHandler) => {
		if (!command || !command.match(Bot.COMMAND_PATTERN)) {
			throw new Error("Invalid command format.");
		}

		const callbacks: CommandHandler[] = !!this._commands[command] ? this._commands[command] : [];
		callbacks.push(commandHandler);
		this._commands[command] = callbacks;
	};

	removeCommand(command: string) {
		this._commands[command] = null;
	}

	existCommand(command: string) {
		return !!this._commands[command];
	}

	addChannel = async (guildId: string, channelId: string): Promise<DiscordChannel> => {
		const exists = await this.existChannel(guildId, channelId);
		if (exists) {
			throw new Error("Channel already exists.");
		}

		const channel = new DiscordChannel();
		channel.guildId = guildId;
		channel.channelId = channelId;
		return channel.save();
	};

	removeChannel = async (guildId: string, channelId: string): Promise<void> => {
		const exists = await this.existChannel(guildId, channelId);
		if (!exists) {
			throw new Error("Channel not exists.");
		}

		DiscordChannel.delete({ guildId, channelId });
	};

	existChannel = async (guildId: string, channelId: string) => {
		const count = await DiscordChannel.count({ where: { guildId, channelId } });
		return count > 0;
	};

	sendMessage = async (guildId: string, channelId: string, message) => {
		const guild = await this._client.guilds.fetch(guildId, false, true);
		if (!guild) {
			console.log("Not guild found.");
			return;
		}

		const channel = guild.channels.cache.find((ch) => ch.id === channelId);
		if (!channel) {
			console.log("Not channel found.");
			return;
		}

		(channel as TextChannel).send(message);
	};

	sendAttachement = async (guildId: string, channelId: string, title: string, attachement) => {
		const guild = await this._client.guilds.fetch(guildId, false, true);
		if (!guild) {
			console.log("Not guild found.");
			return;
		}

		const channel = guild.channels.cache.find((ch) => ch.id === channelId);
		if (!channel) {
			console.log("Not channel found.");
			return;
		}

		(channel as TextChannel).send(title || "", { files: [attachement] });
	};

	getChannels = (): Promise<DiscordChannel[]> => {
		return DiscordChannel.find();
	};

	get channels() {
		return [];
	}

	get client() {
		return this._client;
	}
}
