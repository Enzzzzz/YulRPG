const fs = require('fs');
const chalk = require('chalk');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest');

/**
 * Variável que armazena o token da aplicação.
 * @const {string}
 */
const TOKEN = process.env.TOKEN;

/**
 * Variável que armazena o ID da aplicação.
 * @const {string}
 */
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

/**
 * Função que carrega e registra os comandos da aplicação.
 * @function
 * @param {Client} client - Instância do cliente do Discord.js
 */
module.exports = client => {
    const slashCommands = [];

    fs.readdirSync('./Commands/').forEach(async dir => {
        const files = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const slashCommand = require(`../Commands/${dir}/${file}`);
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
    });

    (async () => {
        try {
            await rest.put(process.env.GUILD_ID ? Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID) : Routes.applicationCommands(CLIENT_ID), {
                body: slashCommands,
            });
            console.log(chalk.yellow('Comandos • Ok'));
        } catch (error) {
            console.log(error);
        }
    })();
};
