const Discord = require("discord.js");

module.exports.greeting = ({ sendAttachement }) => {
	const attachement = new Discord.MessageAttachment(
		"https://media1.tenor.com/images/28fc963091e05e1deb32e096c28f040f/tenor.gif?itemid=18184379",
		"asuka.gif"
	);

	sendAttachement("¡Feliz Jueves!", attachement);
};
