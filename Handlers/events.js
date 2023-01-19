const fs = require('fs');
const chalk = require('chalk');

/**
 * @function
 * @param {Client} client - Instância do cliente do Discord.js
 *
 * Função responsável por carregar os eventos da aplicação.
 * Ela lê a pasta de eventos e carrega todos os arquivos com a extensão .js
 */
module.exports = client => {
    fs.readdirSync('./Events/')
        .filter(file => file.endsWith('.js'))
        .forEach(event => {
            require(`../Events/${event}`);
        });
    console.log(chalk.greenBright('Eventos • Ok'));
};
