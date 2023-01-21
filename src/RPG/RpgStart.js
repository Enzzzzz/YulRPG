const Discord = require("discord.js");
const mongoose = require('mongoose')
const { StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { Schema } = mongoose;
const UsersGlobal = require('../../Schemas/UserGlobal')
const UsersRPG = require("../../Schemas/UserRPG");
const rawClasses = require("../../RawsRPG/classes.json")
const { ApplicationCommandType } = require('discord.js');



module.exports = {
    name: 'rpgstart',
    description: 'Participe do rpg usando esse comando.',
    type: ApplicationCommandType.ChatInput,


    run: async (client, interaction) => {
        
        let user = await UsersRPG.findOne({
            id: interaction.user.id
        });

        const Entrou = new Discord.EmbedBuilder()
            .setTitle('✅ Parabéns!')
            .setDescription('Você acaba de entrar no meu RPG e ganhou um bonus de 200XP no meu sistema de level Global. \nNão sabe como jogar o RPG? acesse: https://yulbot.vercel.app/rpg ou digite /help.')

        const already = new Discord.EmbedBuilder()
            .setTitle(':x: Ops, parece que você já está no meu RPG!')
            .setDescription('Não sabe como jogar o RPG? acesse: https://yulbot.vercel.app/rpg ou digite /help.')


        
        
         if (!user) {
            
            let Menu = new Discord.EmbedBuilder()

            .setColor('A600FF')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Selecione a sua Classe para ver suas informações e então clique em confirmar.`
            )
            .setFooter({ text: `© ${client.user.username} 2023 | ...` })
            .setTimestamp()
    
            const VikingBtn = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('confirmaViking')
                        .setLabel('Confirmar')
                        .setStyle(3),
                );

            const ArqueiroBtn = new Discord.ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('confirmaArqueiro')
                        .setLabel('Confirmar')
                        .setStyle(3),
                );
            
            const SamuraiBtn = new Discord.ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('confirmaSamurai')
                        .setLabel('Confirmar')
                        .setStyle(3),
                );

            const PaladinBtn = new Discord.ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('confirmaPaladin')
                        .setLabel('Confirmar')
                        .setStyle(3),
                );
            
            const DemonBtn = new Discord.ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('confirmaDemon')
                        .setLabel('Confirmar')
                        .setStyle(3),
                );
    
            let painel = new Discord.ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                .setCustomId('menu')
                .setPlaceholder('Selecione uma classe abaixo.')
                .addOptions([{
                    label: 'Seleção de Classe',
                    description: 'Volte para a pagina inicial.',
                    emoji: '◀',
                    value: 'home',
                },
                {
                    label: `${rawClasses[0].name}`,
                    description: 'Veja as informações sobre essa classe.',
                    emoji: '🔧',
                    value: `${rawClasses[0].id}`,
                },
                {
                    label: `${rawClasses[1].name}`,
                    description: 'Veja as informações sobre essa classe.',
                    emoji: '🎮',
                    value: `${rawClasses[1].id}`,
                },
                {
                    label: `${rawClasses[2].name}`,
                    description: 'Veja as informações sobre essa classe.',
                    emoji: '📊',
                    value: `${rawClasses[2].id}`,
                },
                {
                    label: `${rawClasses[3].name}`,
                    description: 'Veja as informações sobre essa classe.',
                    emoji: '📊',
                    value: 'paladino',
                },
                {
                    label: `${rawClasses[4].name}`,
                    description: 'Veja as informações sobre essa classe.',
                    emoji: '📊',
                    value: `${rawClasses[4].id}`,
                },
                ])
            );
    
            await interaction.reply({ embeds: [Menu], content: `${interaction.user}`, components: [painel], fetchReply: true })
            .then(async(message) => {
                const filtro = (i) => i.user.id === interaction.user.id;
                const coletor = await message.channel.createMessageComponentCollector({ filtro, time: 600000 });
    
                coletor.on('collect', async (collected) => {
                    if(collected.isSelectMenu()) {
                        let valor = collected.values[0]
                        collected.deferUpdate()
    
                        if (valor === 'home') {
                            interaction.editReply({ embeds: [Menu], content: `${interaction.user}`, components: [painel]});
    
                        } else if (valor === rawClasses[0].id) {
                            let Viking = new Discord.EmbedBuilder()
    
                                .setTitle('CLASSE - VIKING')
                                .setColor('A600FF')
                                .setThumbnail(rawClasses[0].icon)
                                .setDescription(`${rawClasses[0].description}`)
                                .addFields(
                                    {
                                        name: `Status Gerais`,
                                        value: `<:hp:1065001128758100108> **Vida:** ${rawClasses[0].stats.hp}\n<:mana:1065002395978969168> **Mana:** ${rawClasses[0].stats.mp}\n<:armor:1065004216835387492> **Armadura:** ${rawClasses[0].stats.armor}\n<:dmg:1065003206968615084> **Dano:** ${rawClasses[0].stats.attackdamage}`,
                                        inline: false,
                                    },
                                    {
                                        name: `Armas Usadas`,
                                        value: `${rawClasses[0].weapons[0]} e ${rawClasses[0].weapons[1]}`,
                                        inline: false,
                                    },
                                    {
                                        name: `Habilidades`,
                                        value: `${rawClasses[0].skills[0]}\n${rawClasses[0].skills[1]}\n${rawClasses[0].skills[2]}`,
                                        inline: false,
                                    },
                                    {
                                        name: `Ultimate`,
                                        value: `**${rawClasses[0].ultimate}**\n${rawClasses[0].ultimatedesc}`,
                                        inline: false,
                                    }
                                )
                                .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                                .setTimestamp()
    
                            await interaction.editReply({ embeds: [Viking], content: `${interaction.user}`, components: [painel, VikingBtn] })
    
                        } else if (valor === rawClasses[1].id) {
    
                            let Arqueiro = new Discord.EmbedBuilder()
    
                            .setTitle('CLASSE - ARQUEIRO')
                            .setColor('A600FF')
                            .setThumbnail(`${rawClasses[1].icon}`)
                            .setDescription(`${rawClasses[1].description}`)
                            .addFields(
                                {
                                    name: `Status Gerais`,
                                    value: `<:hp:1065001128758100108> **Vida:** ${rawClasses[1].stats.hp}\n<:mana:1065002395978969168> **Mana:** ${rawClasses[1].stats.mp}\n<:armor:1065004216835387492> **Armadura:** ${rawClasses[1].stats.armor}\n<:dmg:1065003206968615084> **Dano:** ${rawClasses[1].stats.attackdamage}`,
                                    inline: false,
                                },
                                {
                                    name: `Armas Usadas`,
                                    value: `${rawClasses[1].weapons[0]}`,
                                    inline: false,
                                },
                                {
                                    name: `Habilidades`,
                                    value: `${rawClasses[1].skills[0]}\n${rawClasses[1].skills[1]}\n${rawClasses[1].skills[2]}`,
                                    inline: false,
                                },
                                {
                                    name: `Ultimate`,
                                    value: `**${rawClasses[1].ultimate}**\n${rawClasses[1].ultimatedesc}`,
                                    inline: false,
                                }
                            )
                            .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                            .setTimestamp()
    
                            await interaction.editReply({ embeds: [Arqueiro], content: `${interaction.user}`, components: [painel, ArqueiroBtn] })
    
    
                        } else if (valor === rawClasses[2].id) {
    
                            let Samurai = new Discord.EmbedBuilder()
    
                            .setTitle('CLASSE - SAMURAI')
                            .setColor('A600FF')
                            .setThumbnail(`${rawClasses[2].icon}`)
                            .setDescription(`${rawClasses[2].description}`)
                            .addFields(
                                {
                                    name: `Status Gerais`,
                                    value: `<:hp:1065001128758100108> **Vida:** ${rawClasses[2].stats.hp}\n<:mana:1065002395978969168> **Mana:** ${rawClasses[2].stats.mp}\n<:armor:1065004216835387492> **Armadura:** ${rawClasses[2].stats.armor}\n<:dmg:1065003206968615084> **Dano:** ${rawClasses[2].stats.attackdamage}`,
                                    inline: false,
                                },
                                {
                                    name: `Armas Usadas`,
                                    value: `${rawClasses[2].weapons[0]}`,
                                    inline: false,
                                },
                                {
                                    name: `Habilidades`,
                                    value: `${rawClasses[2].skills[0]}\n${rawClasses[2].skills[1]}\n${rawClasses[2].skills[2]}`,
                                    inline: false,
                                },
                                {
                                    name: `Ultimate`,
                                    value: `**${rawClasses[2].ultimate}**\n${rawClasses[2].ultimatedesc}`,
                                    inline: false,
                                }
                            )
                            .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                            .setTimestamp()
    
                            await interaction.editReply({ embeds: [Samurai], content: `${interaction.user}`, components: [painel, SamuraiBtn] })
    
    
                        } else if (valor === rawClasses[3].id) {
    
                            let Paladino = new Discord.EmbedBuilder()
    
                            .setTitle('CLASSE - PALADINO')
                            .setColor('A600FF')
                            .setThumbnail(`${rawClasses[3].icon}`)
                            .setDescription(`${rawClasses[3].description}`)
                            .addFields(
                                {
                                    name: `Status Gerais`,
                                    value: `<:hp:1065001128758100108> **Vida:** ${rawClasses[3].stats.hp}\n<:mana:1065002395978969168> **Mana:** ${rawClasses[3].stats.mp}\n<:armor:1065004216835387492> **Armadura:** ${rawClasses[3].stats.armor}\n<:dmg:1065003206968615084> **Dano:** ${rawClasses[3].stats.attackdamage}`,
                                    inline: false,
                                },
                                {
                                    name: `Armas Usadas`,
                                    value: `${rawClasses[3].weapons[0]} e ${rawClasses[3].weapons[1]}`,
                                    inline: false,
                                },
                                {
                                    name: `Habilidades`,
                                    value: `${rawClasses[3].skills[0]}\n${rawClasses[3].skills[1]}\n${rawClasses[3].skills[2]}`,
                                    inline: false,
                                },
                                {
                                    name: `Ultimate`,
                                    value: `**${rawClasses[3].ultimate}**\n${rawClasses[3].ultimatedesc}`,
                                    inline: false,
                                }
                            )
                            .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                            .setTimestamp()
    
                            await interaction.editReply({ embeds: [Paladino], content: `${interaction.user}`, components: [painel, PaladinBtn] })
    
    
                        } else if (valor === rawClasses[4].id) {
    
                            let DemonS = new Discord.EmbedBuilder()
    
                            .setTitle('CLASSE - Demon Slayer')
                            .setColor('A600FF')
                            .setThumbnail(`${rawClasses[4].icon}`)
                            .setDescription(`${rawClasses[4].description}`)
                            .addFields(
                                {
                                    name: `Status Gerais`,
                                    value: `<:hp:1065001128758100108> **Vida:** ${rawClasses[4].stats.hp}\n<:mana:1065002395978969168> **Mana:** ${rawClasses[4].stats.mp}\n<:armor:1065004216835387492> **Armadura:** ${rawClasses[4].stats.armor}\n<:dmg:1065003206968615084> **Dano:** ${rawClasses[4].stats.attackdamage}`,
                                    inline: false,
                                },
                                {
                                    name: `Armas Usadas`,
                                    value: `${rawClasses[4].weapons[0]}`,
                                    inline: false,
                                },
                                {
                                    name: `Habilidades`,
                                    value: `${rawClasses[4].skills[0]}\n${rawClasses[4].skills[1]}\n${rawClasses[4].skills[2]}`,
                                    inline: false,
                                },
                                {
                                    name: `Ultimate`,
                                    value: `**${rawClasses[4].ultimate}**\n${rawClasses[4].ultimatedesc}`,
                                    inline: false,
                                }
                            )
                            .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                            .setTimestamp()
    
                            await interaction.editReply({ embeds: [DemonS], content: `${interaction.user}`, components: [painel, DemonBtn] })
    
    
                        };
                        }
    
                        let valor = collected.customId
                        if (valor === 'confirmaViking') {
    
                        let confirmVkn = new Discord.EmbedBuilder()
    
                        .setTitle('Classe Escolhida com sucesso')
                        .setColor('A600FF')
                        .setThumbnail(rawClasses[0].icon)
                        .setDescription(`Você escolheu sua classe com sucesso! Para começar a jogar digite /Jogar`)
                        .addFields(
                            {
                                name: `VIKING`,
                                value: `VIKINGZINHO MEU MANO`,
                                inline: false,
                            }
                        )
                        .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                        .setTimestamp()

                        await UsersRPG.create({
                                    id: interaction.user.id,
                                    discordName: interaction.user.username,
                                    skill1: rawClasses[0].skills[0],
                                    skill2: rawClasses[0].skills[1],
                                    skill3: rawClasses[0].skills[2],
                                    ult: rawClasses[0].ultimate,
                                    hpatual: rawClasses[0].stats.hp,
                                    hpmax: rawClasses[0].stats.hp,
                                    hpUp: rawClasses[0].stats.hpperlevel,
                                    dano: rawClasses[0].stats.attackdamage,
                                    danoUp: rawClasses[0].stats.attackdamageperlevel,
                                    manaatual: rawClasses[0].stats.mp,
                                    manamax: rawClasses[0].stats.mp,
                                    manaUp: rawClasses[0].stats.mpperlevel,
                                    armor: rawClasses[0].stats.armor,
                                    armorUp: rawClasses[0].stats.armorperlevel,
                                    arma1: rawClasses[0].weapons[0],
                                    arma2: rawClasses[0].weapons[1],
                                    classe: rawClasses[0].name
                                });
    
                        await interaction.editReply({ embeds: [Entrou, confirmVkn], content: `${interaction.user}`, components: []})
    
                    } else if (valor === 'confirmaArqueiro') {

                        let confirmArq = new Discord.EmbedBuilder()
    
                        .setTitle('Classe Escolhida com sucesso')
                        .setColor('A600FF')
                        .setThumbnail(`${rawClasses[1].icon}`)
                        .setDescription(`Você escolheu sua classe com sucesso! Para começar a jogar digite /Jogar`)
                        .addFields(
                            {
                                name: `ARQUEIRO`,
                                value: `ARQUEIROZINHO MEU MANO`,
                                inline: false,
                            }
                        )
                        .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                        .setTimestamp()

                        await UsersRPG.create({
                            id: interaction.user.id,
                            discordName: interaction.user.username,
                            skill1: rawClasses[1].skills[0],
                            skill2: rawClasses[1].skills[1],
                            skill3: rawClasses[1].skills[2],
                            ult: rawClasses[1].ultimate,
                            hpatual: rawClasses[1].stats.hp,
                            hpmax: rawClasses[1].stats.hp,
                            hpUp: rawClasses[1].stats.hpperlevel,
                            dano: rawClasses[1].stats.attackdamage,
                            danoUp: rawClasses[1].stats.attackdamageperlevel,
                            manaatual: rawClasses[1].stats.mp,
                            manamax: rawClasses[1].stats.mp,
                            manaUp: rawClasses[1].stats.mpperlevel,
                            armor: rawClasses[1].stats.armor,
                            armorUp: rawClasses[1].stats.armorperlevel,
                            arma1: rawClasses[1].weapons[0],
                            classe: rawClasses[1].name
                        });
    
                        await interaction.editReply({ embeds: [Entrou, confirmArq], content: `${interaction.user}`, components: []})

                    } else if (valor === 'confirmaSamurai') {
    
                        let confirmSam = new Discord.EmbedBuilder()
    
                        .setTitle('Classe Escolhida com sucesso')
                        .setColor('A600FF')
                        .setThumbnail(`${rawClasses[2].icon}`)
                        .setDescription(`Você escolheu sua classe com sucesso! Para começar a jogar digite /Jogar`)
                        .addFields(
                            {
                                name: `SAMURAI`,
                                value: `SAMURAIZINHO MEU MANO`,
                                inline: false,
                            }
                        )
                        .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                        .setTimestamp()

                        await UsersRPG.create({
                            id: interaction.user.id,
                            discordName: interaction.user.username,
                            skill1: rawClasses[2].skills[0],
                            skill2: rawClasses[2].skills[1],
                            skill3: rawClasses[2].skills[2],
                            ult: rawClasses[2].ultimate,
                            hpatual: rawClasses[2].stats.hp,
                            hpmax: rawClasses[2].stats.hp,
                            hpUp: rawClasses[2].stats.hpperlevel,
                            dano: rawClasses[2].stats.attackdamage,
                            danoUp: rawClasses[2].stats.attackdamageperlevel,
                            manaatual: rawClasses[2].stats.mp,
                            manamax: rawClasses[2].stats.mp,
                            manaUp: rawClasses[2].stats.mpperlevel,
                            armor: rawClasses[2].stats.armor,
                            armorUp: rawClasses[2].stats.armorperlevel,
                            arma1: rawClasses[2].weapons[0],
                            classe: rawClasses[2].name
                        });
    
                        await interaction.editReply({ embeds: [Entrou, confirmSam], content: `${interaction.user}`, components: []})
                    
                    } else if (valor === 'confirmaPaladin') {
    
                        let confirmPal = new Discord.EmbedBuilder()
    
                        .setTitle('Classe Escolhida com sucesso')
                        .setColor('A600FF')
                        .setThumbnail(`${rawClasses[3].icon}`)
                        .setDescription(`Você escolheu sua classe com sucesso! Para começar a jogar digite /Jogar`)
                        .addFields(
                            {
                                name: `PALADINO`,
                                value: `PALADINOZINHO MEU MANO`,
                                inline: false,
                            }
                        )
                        .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                        .setTimestamp()

                        await UsersRPG.create({
                            id: interaction.user.id,
                            discordName: interaction.user.username,
                            skill1: rawClasses[3].skills[0],
                            skill2: rawClasses[3].skills[1],
                            skill3: rawClasses[3].skills[2],
                            ult: rawClasses[3].ultimate,
                            hpatual: rawClasses[3].stats.hp,
                            hpmax: rawClasses[3].stats.hp,
                            hpUp: rawClasses[3].stats.hpperlevel,
                            dano: rawClasses[3].stats.attackdamage,
                            danoUp: rawClasses[3].stats.attackdamageperlevel,
                            manaatual: rawClasses[3].stats.mp,
                            manamax: rawClasses[3].stats.mp,
                            manaUp: rawClasses[3].stats.mpperlevel,
                            armor: rawClasses[3].stats.armor,
                            armorUp: rawClasses[3].stats.armorperlevel,
                            arma1: rawClasses[3].weapons[0],
                            arma2: rawClasses[3].weapons[1],
                            classe: rawClasses[3].name
                        });
    
                        await interaction.editReply({ embeds: [Entrou, confirmPal], content: `${interaction.user}`, components: []})
                    
                    } else if (valor === 'confirmaDemon') {
    
                        let confirmDmn = new Discord.EmbedBuilder()
    
                        .setTitle('Classe Escolhida com sucesso')
                        .setColor('A600FF')
                        .setThumbnail(`${rawClasses[4].icon}`)
                        .setDescription(`Você escolheu sua classe com sucesso! Para começar a jogar digite /Jogar`)
                        .addFields(
                            {
                                name: `DEMON`,
                                value: `DEMONZINHO MEU MANO`,
                                inline: false,
                            }
                        )
                        .setFooter({ text: `© ${client.user.username} 2023 | ...` })
                        .setTimestamp()

                        await UsersRPG.create({
                            id: interaction.user.id,
                            discordName: interaction.user.username,
                            skill1: rawClasses[4].skills[0],
                            skill2: rawClasses[4].skills[1],
                            skill3: rawClasses[4].skills[2],
                            ult: rawClasses[4].ultimate,
                            hpatual: rawClasses[4].stats.hp,
                            hpmax: rawClasses[4].stats.hp,
                            hpUp: rawClasses[4].stats.hpperlevel,
                            dano: rawClasses[4].stats.attackdamage,
                            danoUp: rawClasses[4].stats.attackdamageperlevel,
                            manaatual: rawClasses[4].stats.mp,
                            manamax: rawClasses[4].stats.mp,
                            manaUp: rawClasses[4].stats.mpperlevel,
                            armor: rawClasses[4].stats.armor,
                            armorUp: rawClasses[4].stats.armorperlevel,
                            arma1: rawClasses[4].weapons[0],
                            classe: rawClasses[4].name
                        });
    
                        await interaction.editReply({ embeds: [Entrou, confirmDmn], content: `${interaction.user}`, components: []})
                    
                    }
                })
            })
        } else {
            return interaction.reply({ embeds: [ already ] })
        }

    },
};
