import { command, default as CookiecordClient, Module } from 'cookiecord';
import { Message, MessageEmbed } from 'discord.js';

export default class HelpModule extends Module {
	protected client: any;
	constructor (client: CookiecordClient) {
		super(client);

		this.client = client;
	}

	@command({ aliases: ['help', 'commands', 'h'] })
	async help (message: Message, args: string) {
		if (!args) {
			let embed = new MessageEmbed()
				.setAuthor(
					message.guild.name,
					message.guild.iconURL({ dynamic: true }),
				)
				.setTitle('Help Command!')
				.setDescription(
					`Hello ${message.author.username}! Here is a list of all commands in me! To get detailed description on any specific command, do \`help <command>\``,
				)
				.addField(
					`**Misc Commands:**`,
					`\`help\` ► View a list of all commands!\n\`ping\` ► View the latency of the bot\n\`ask\` ► Sends a message with a link redirecting to dontasktoask.com\n\`playground\` ► Just enter your code and get a link with TS playground!`,
				)
				.addField(
					`**Help Channel Commands:**`,
					`\`done\` ► Close a __ongoing__ help channel opened by you!`,
				)
				.addField(
					`**Reputation Commands**`,
					`\`rep\` ► Did somebody help you? Give them a reputation point!\n\`history\` ► Check the reputation history of a user!\n\`leaderboard\` ► See the reputation leaderboard!`,
				)
				.setFooter(
					this.client.user.username,
					this.client.displayAvatarURL(),
				)
				.setTimestamp();

			return message.channel.send(embed);
		} else {
			switch (args[0]) {
				case 'ping':
					message.channel.send(
						`Aliases: \`ping\`\nDescription: *View the latency of the bot*\nUsage: \`ping\``,
					);
					break;
				case 'ask':
					message.channel.send(
						`Aliases: \`ask\`\nDescription: *Bot sends a dontasktoask website link*\nUsage: \`ask\``,
					);
					break;
				case 'done':
					message.channel.send(
						`Aliases: \`done\`, \`close\`, \`resolve\`\nDescription: *Close a opened help channel*\nUsage: \`close\``,
					);
					break;
				case 'rep':
					message.channel.send(
						`Aliases: \`rep\`\nDescription: *Give a user some reputation*\nUsage: \`rep <user>\``,
					);
					break;
				case 'history':
					message.channel.send(
						`Aliases: \`getrep\`, \`history\`\nDescription: *Get the reputation history of a user*\nUsage: \`history <user>\``,
					);
					break;
				case 'leaderboard':
					message.channel.send(
						`Aliases: \`leaderboard\`, \`lb\`\nDescription: *View the reputation leaderboard!*\nUsage: \`leaderboard\``,
					);
					break;
				case 'help':
					message.channel.send(
						`Aliases: \`help\`, \`commands\`, \`h\`\nDescription: *Get the list of commands in me!*\nUsage: \`help [command (optional)]\``,
					);
					break;
				default:
					message.channel.send(`No command found!`);
			}
		}
	}
}
