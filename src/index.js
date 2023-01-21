require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const path = require('path');

/**
 * @type {Client}
 * @property {Collection} slashCommands - Coleção de comandos personalizados.
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
});

client.slashCommands = new Collection();

module.exports = client;

const handlers_path = path.resolve(__dirname, 'Handlers');

/**
 * @function
 * @param {string} handler - Nome do arquivo da pasta Handlers.
 */
fs.readdirSync(handlers_path).forEach((filename) => {
  const handler_path = `${handlers_path}/${filename}`;
  const handler = require(handler_path);

  handler(client);
});

client.login(process.env.TOKEN);