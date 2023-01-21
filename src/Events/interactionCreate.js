const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (interaction.type == 4) {
        if (slashCommand.autocomplete) {
            const choices = [];
            await slashCommand.autocomplete(interaction, choices);
        }
    }
    if (!interaction.type == 2) return;
    if (!interaction.guild) return;

    if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
    try {
        if (slashCommand.userPerms || slashCommand.botPerms) {
            if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                const userPerms = new EmbedBuilder().setDescription(`Você não possui a permissão \`${slashCommand.userPerms}\``).setColor('Red');
                return interaction.reply({ embeds: [userPerms], ephemeral: true });
            }
            if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                const botPerms = new EmbedBuilder().setDescription(`Eu não possuo a permissão \`${slashCommand.botPerms}\``).setColor('Red');
                return interaction.reply({ embeds: [botPerms], ephemeral: true });
            }
        }

        if (slashCommand.ownerOnly) {
            if (!process.env.OWNER.includes(interaction.user.id)) {
                return interaction.reply({
                    content: `Apenas meu dono pode executar esse comando!`,
                    ephemeral: true,
                });
            }
        }

        await slashCommand.run(client, interaction);
    } catch (error) {
        console.log(error);
    }
});
