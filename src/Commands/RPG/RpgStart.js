const Discord = require('discord.js');
const { StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ApplicationCommandType } = require('discord.js');
const UsersRPG = require('../../Schemas/UserRPG');
const rawHabilidades = require('../../RawsRPG/habilidades.json')
const rawClasses = require('../../RawsRPG/classes.json');
const UsersGlobal = require('../../Schemas/UserGlobal')

module.exports = {
  name: 'rpgstart',
  description: 'Participe do rpg usando esse comando.',
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const user = await UsersRPG.findOne({
      id: interaction.user.id,
    });

    const isNewUser = !user;

    if (isNewUser) {
      const Menu = new Discord.EmbedBuilder()
        .setColor('A600FF')
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          'Selecione a sua Classe para ver suas informações e então clique em confirmar. \n:x: Não é possível alterar a classe mais tarde, escolha com cuidado!',
        )
        .setFooter({ text: `© ${client.user.username} 2023 | ...` })
        .setTimestamp();

      const classesOptions = rawClasses.map((rpgClass) => ({
        label: rpgClass.name,
        description: 'Veja as informações sobre essa classe.',
        emoji: rpgClass.emoji ?? '❓',
        value: rpgClass.id,
      }));

      const painel = new Discord.ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('menu')
          .setPlaceholder('Selecione uma classe abaixo.')
          .addOptions([
            {
              label: 'Seleção de Classe',
              description: 'Volte para a pagina inicial.',
              emoji: '◀',
              value: 'home',
            },
            ...classesOptions,
          ]),
      );

      await interaction
        .reply({
          embeds: [Menu],
          content: `${interaction.user}`,
          components: [painel],
          fetchReply: true,
        })
        .then(async (message) => {
          const filter = (i) => i.user.id === interaction.user.id;
          const TIME_10_MINUTES = 600_000;
          const coletor = await message.channel.createMessageComponentCollector({
            filter,
            time: TIME_10_MINUTES,
          });

          coletor.on('collect', async (collected) => {
            if (collected.isSelectMenu()) {
              const valor = collected.values[0];
              collected.deferUpdate();

              const rpgClasse = rawClasses.find((rpgClass) => valor === rpgClass.id);

              if (rpgClasse) {
                const embed = new Discord.EmbedBuilder()
                  .setTitle(`CLASSE - ${rpgClasse.name.toUpperCase()}`)
                  .setColor('#A600FF')
                  .setThumbnail(rpgClasse.icon)
                  .setDescription(`${rpgClasse.description}`)

                  .addFields(
                    {
                      name: 'Status Gerais',
                      value: `<:hp:1065001128758100108> **Vida:** ${rpgClasse.stats.hp}\n<:mana:1065002395978969168> **Mana:** ${rpgClasse.stats.mp}\n<:armor:1065004216835387492> **Armadura:** ${rpgClasse.stats.armor}\n<:dmg:1065003206968615084> **Dano:** ${rpgClasse.stats.attackdamage}`,
                      inline: false,
                    },
                    {
                      name: 'Armas Usadas',
                      value: rpgClasse.weapons.join(', '),
                      inline: false,
                    },
                    {
                      name: 'Habilidades',
                      value: rpgClasse.skills.join('\n'),
                      inline: false,
                    },
                    {
                      name: 'Ultimate',
                      value: `**${rpgClasse.ultimate}**\n${rpgClasse.ultimatedesc}`,
                      inline: false,
                    },
                  )
                  .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                  .setTimestamp();

                const skills2 = rawHabilidades.find((skill) => valor === skill.id);

                const confirmButton = new Discord.ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setCustomId(`confirm:${rpgClasse.id}`)
                    .setLabel('Confirmar')
                    .setStyle(ButtonStyle.Success),
                  new ButtonBuilder()
                    .setCustomId(`skill:${skills2.id}`)
                    .setLabel('Ver Habilidades')
                    .setStyle(ButtonStyle.Primary),
                );

                await interaction.editReply({
                  embeds: [embed],
                  content: `${interaction.user}`,
                  components: [painel, confirmButton],
                });

                return;
              }

              if (valor === 'home') {
                return interaction.editReply({
                  embeds: [Menu],
                  content: `${interaction.user}`,
                  components: [painel],
                });
              }
            }

            if (collected.isButton() && collected.customId.startsWith('skill')) {
              const [_confirm, rpgSkillId] = collected.customId.split(':');
              const skills = rawHabilidades.find((rpgSkill) => rpgSkillId === rpgSkill.id);
              const rpgClasse = rawClasses.find((rpgClass) => rpgSkillId === rpgClass.id);


              const embed2 = new Discord.EmbedBuilder()
                .setTitle(`CLASSE - ${rpgClasse.name.toUpperCase()}`)
                .setColor('#A600FF')
                .setThumbnail(rpgClasse.icon)
                .setDescription(`${skills.desc} ${rpgClasse.name}`)

                .addFields(
                  {
                    name: 'Habilidades Principais',
                    value: `<:hp:1065001128758100108> **Habilidade 1:** ${skills.skills.skill1.nome}\n<:mana:1065002395978969168> **Habilidade 2:** ${skills.skills.skill2.nome}\n<:armor:1065004216835387492> **Habilidade 3:** ${skills.skills.skill3.nome}`,
                    inline: false,
                  },
                  {
                    name: `${skills.skills.skill1.nome}`,
                    value: `${skills.skills.skill1.description}\n\n**Dano:** ${skills.skills.skill1.dano}\n**Cooldown:** ${skills.skills.skill1.cooldown} Rodadas`,
                    inline: false,
                  },
                  {
                    name: `${skills.skills.skill2.nome}`,
                    value: `${skills.skills.skill2.description}\n\n**Dano:** ${skills.skills.skill2.dano}\n**Cooldown:** ${skills.skills.skill2.cooldown} Rodadas`,
                    inline: false,
                  },
                  {
                    name: `${skills.skills.skill3.nome}`,
                    value: `${skills.skills.skill3.description}\n\n**Dano:** ${skills.skills.skill3.dano}\n**Cooldown:** ${skills.skills.skill3.cooldown} Rodadas`,
                    inline: false,
                  },
                  {
                    name: 'Ultimate',
                    value: `**${skills.ultimate}**\n${skills.ultimatedesc}`,
                    inline: false,
                  },
                )
                .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                .setTimestamp();



              await interaction.editReply({
                embeds: [embed2],
                content: `${interaction.user}`,
                components: [painel],
              });
            }

            if (collected.isButton() && collected.customId.startsWith('confirm')) {
              const [_confirm, rpgClassId] = collected.customId.split(':');
              const rpgClasse = rawClasses.find((rpgClass) => rpgClassId === rpgClass.id);

              await UsersRPG.create({
                id: interaction.user.id,
                discordName: interaction.user.username,
                skill1: rpgClasse.skills[0],
                skill2: rpgClasse.skills[1],
                skill3: rpgClasse.skills[2],
                ult: rpgClasse.ultimate,
                hpatual: rpgClasse.stats.hp,
                hpmax: rpgClasse.stats.hp,
                hpUp: rpgClasse.stats.hpperlevel,
                dano: rpgClasse.stats.attackdamage,
                danoUp: rpgClasse.stats.attackdamageperlevel,
                manaatual: rpgClasse.stats.mp,
                manamax: rpgClasse.stats.mp,
                manaUp: rpgClasse.stats.mpperlevel,
                armor: rpgClasse.stats.armor,
                armorUp: rpgClasse.stats.armorperlevel,
                arma1: rpgClasse.weapons[0],
                arma2: rpgClasse.weapons[1],
                classe: rpgClasse.name,
              });

              const congratulationsEmbed = new Discord.EmbedBuilder()
                .setTitle('✅ Parabéns!')
                .setDescription(
                  'Você acaba de entrar no meu RPG e ganhou um bonus de 200XP no meu sistema de level Global. \nNão sabe como jogar o RPG? acesse: https://yulbot.vercel.app/rpg ou digite /help.',
                );

              const successEmbed = new Discord.EmbedBuilder()
                .setTitle('Classe Escolhida com sucesso')
                .setColor('A600FF')
                .setThumbnail(rpgClasse.icon)
                .setDescription(
                  'Você escolheu sua classe com sucesso! Para começar a jogar digite /Jogar',
                )
                .addFields({
                  name: rpgClasse.name.toUpperCase(),
                  value: rpgClasse.name.toUpperCase() + ' MEU MANO',
                  inline: false,
                })
                .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                .setTimestamp();

              await interaction.editReply({
                embeds: [congratulationsEmbed, successEmbed],
                content: `${interaction.user}`,
                components: [],
              });
            }
          });
        });
    } else {
      const embed = new Discord.EmbedBuilder()
        .setTitle(':x: Ops, parece que você já está no meu RPG!')
        .setDescription(
          'Não sabe como jogar o RPG? acesse: https://yulbot.vercel.app/rpg ou digite /help.',
        );

      return interaction.reply({ embeds: [embed] });
    }
  },
};
