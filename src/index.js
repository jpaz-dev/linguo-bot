const Bot = require("./bot");
const { cron } = require("./cron");
const { greeting } = require("./commands/greeting");

Bot.addCommand("asuka", greeting);

Bot.addCommand("add_channel", ({ guildId, channelId, reply }) => {
	if (Bot.channels.filter((ch) => ch.guildId === guildId && ch.channelId === channelId).length === 0) {
		Bot.channels.push({ guildId, channelId });
		reply("Ok");
		console.log(Bot.channels);
	} else {
		reply("Channel already added");
	}
});

Bot.addCommand("remove_channel", ({ guildId, channelId, reply }) => {
	Bot.channels = Bot.channels.filter((ch) => !(ch.guildId === guildId && ch.channelId === channelId));
	reply("Ok");
	console.log(Bot.channels);
});

Bot.client.on("ready", () => cron());

Bot.start();
