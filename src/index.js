require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

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
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
});

client.slashCommands = new Collection();

module.exports = client;

/**
 * @function
 * @param {string} handler - Nome do arquivo da pasta Handlers.
 */
fs.readdirSync('./Handlers').forEach(handler => {
    require(`./Handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
