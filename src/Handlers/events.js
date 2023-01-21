const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

/**
 * @function
 * @param {Client} client - Instância do cliente do Discord.js
 *
 * Função responsável por carregar os eventos da aplicação.
 * Ela lê a pasta de eventos e carrega todos os arquivos com a extensão .js
 */

module.exports = (_client) => {
  const events_path = path.resolve(__dirname, '..', 'Events');

  fs.readdirSync(events_path)
    .filter((file) => file.endsWith('.js'))
    .forEach((filename) => {
      const event_path = `${events_path}/${filename}`;
      require(event_path);
    });

  console.log(chalk.greenBright('Eventos • Ok'));
};