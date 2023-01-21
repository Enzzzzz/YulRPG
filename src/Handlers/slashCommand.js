const fs = require('fs');
const chalk = require('chalk');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest');
const path = require('path');

/**
 * Variável que armazena o token da aplicação.
 * @const {string}
 */
const { TOKEN } = process.env;

/**
 * Variável que armazena o ID da aplicação.
 * @const {string}
 */
const { CLIENT_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(TOKEN);

/**
 * Função que carrega e registra os comandos da aplicação.
 * @function
 * @param {Client} client - Instância do cliente do Discord.js
 */

const COMMANDS_PATH = path.resolve(__dirname, '..', 'Commands');

module.exports = async (client) => {
  const slashCommands = [];

  const commandCategories = fs.readdirSync(COMMANDS_PATH);

  commandCategories.forEach(async (commandCategoryName) =>
    loadCommandsFromCategoryFolder(commandCategoryName, slashCommands, client),
  );

  await registerSlashCommands(slashCommands);
};

async function registerSlashCommands(slashCommands) {
  try {
    await rest.put(
      process.env.GUILD_ID
        ? Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID)
        : Routes.applicationCommands(CLIENT_ID),
      {
        body: slashCommands,
      },
    );
    console.log(chalk.yellow('Comandos • Ok'));
  } catch (error) {
    console.log(error);
  }
}

function loadCommandsFromCategoryFolder(commandCategoryName, slashCommands, client) {
  const commandCategoryPath = path.resolve(COMMANDS_PATH, commandCategoryName);
  const files = fs.readdirSync(commandCategoryPath).filter((file) => file.endsWith('.js'));

  for (const file of files) {
    const commandPath = path.resolve(COMMANDS_PATH, commandCategoryName, file);
    const slashCommand = require(commandPath);

    slashCommands.push({
      name: slashCommand.name,
      description: slashCommand.description,
      type: slashCommand.type,
      options: slashCommand.options ? slashCommand.options : null,
      default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
      default_member_permissions: slashCommand.default_member_permissions
        ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString()
        : null,
    });

    if (slashCommand.name) {
      client.slashCommands.set(slashCommand.name, slashCommand);
    }
  }
}