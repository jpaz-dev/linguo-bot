export interface CommandHandlerArgs {
	args: string[];
	command: string;
	channelId: string;
	guildId: string;
	reply(text);
	sendAttachement(title: string, attachement);
	sendMessage(embed);
}

export interface CommandHandler {
	(args: CommandHandlerArgs): void;
}
