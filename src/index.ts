import { token, botAdmins, prefixes } from './env';
import CookiecordClient from 'cookiecord';
import { Intents } from 'discord.js';
import { getDB } from './db';
import { hookLog } from './log';

import { AutoroleModule } from './modules/autorole';
import { EtcModule } from './modules/etc';
import { HelpThreadModule } from './modules/helpthread';
import { PlaygroundModule } from './modules/playground';
import { RepModule } from './modules/rep';
import { TwoslashModule } from './modules/twoslash';
import { HelpModule } from './modules/help';
import { SnippetModule } from './modules/snippet';
import { HandbookModule } from './modules/handbook';
import { ModModule } from './modules/mod';

const client = new CookiecordClient(
	{
		botAdmins,
		prefix: prefixes,
	},
	{
		partials: ['REACTION', 'MESSAGE', 'USER', 'CHANNEL'],
		allowedMentions: {
			parse: ['users', 'roles'],
		},
		intents: new Intents([
			'GUILDS',
			'GUILD_MESSAGES',
			'GUILD_MEMBERS',
			'GUILD_MESSAGE_REACTIONS',
			'DIRECT_MESSAGES',
		]),
	},
).setMaxListeners(Infinity);

for (const mod of [
	AutoroleModule,
	EtcModule,
	HelpThreadModule,
	PlaygroundModule,
	RepModule,
	TwoslashModule,
	HelpModule,
	SnippetModule,
	HandbookModule,
	ModModule,
]) {
	client.registerModule(mod);
}

getDB(); // prepare the db for later

client.login(token);
client.on('ready', () => {
	console.log(`Logged in as ${client.user?.tag}`);
	hookLog(client);
});

process.on('unhandledRejection', e => {
	console.error('Unhandled rejection', e);
});
