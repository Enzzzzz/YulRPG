const chalk = require('chalk');
const ms = require('ms');
const mongoose = require('mongoose');
const client = require('..');

/**
 * @event 'ready'
 * Este evento é acionado quando o cliente está pronto
 *
 * Ele define um intervalo para atualizar a atividade do bot para exibir o ping atual em milissegundos a cada 5 segundos.
 * Ele também registra uma mensagem no console para indicar que o bot está online.
 */
client.on('ready', () => {
  const { user } = client;
  /**
   * @function setInterval
   * Ele define um intervalo para atualizar a atividade do bot para exibir o ping atual em milissegundos a cada 5 segundos.
   *
   * @param {function} função a ser executada a cada 5 segundos
   * @param {number} 5s - tempo em milissegundos para o intervalo
   *
   * @returns {number} um timerId
   *
   */
  setInterval(() => {
    user.setActivity({ name: 'Comece agora, digite /RpgStart', type: 3 });
  }, ms('5s'));

  /**
   * @function console.log
   * Registra uma mensagem no console para indicar que o bot está online.
   *
   * @param {string} `${client.user.username} online!` - mensagem a ser registrada no console
   */

  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(chalk.green('[Sucesso] Conectado com a banco de dados (MongoDB).'));
    })
    .catch((err) => {
      console.log('[Error] Não conectei com o banco de dados (MongoDB). ', err);
    });

  console.log(chalk.red(`${client.user.username} online!`));
});