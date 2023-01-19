const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: '', //  O nome do comando. Ex: "kick"
    description: '', // Uma descrição breve do que o comando faz. Ex: "Expulsa um membro do servidor"
    type: ApplicationCommandType.ChatInput, // O tipo de comando.
    userPerms: [], // Permissões necessárias para o usuário usar o comando. Ex: ["KickMembers"]
    botPerms: [], // Permissões necessárias para o bot usar o comando. Ex: ["KickMembers"]
    ownerOnly: true, // Se o comando é limitado ao criador da aplicação. ( ID salvo no .env )
    run: async (client, interaction) => {
        // A função a ser executada quando o comando é chamado.
    },
};
