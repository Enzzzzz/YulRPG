const Discord = require("discord.js");
const mongoose = require('mongoose')
const { Schema } = mongoose;
const { ActionRowBuilder, ButtonBuilder, ApplicationCommandType } = require("discord.js");
const UsersGlobal = require('../../Schemas/UserGlobal')
const UsersRPG = require("../../Schemas/UserRPG");
const rawMonstros = require("../../RawsRPG/monstros.json")
const RpgStats = require("../../Schemas/RPGstats")


module.exports = {
    name: "jogar",
    description: "Participe do rpg usando esse comando. 🟢",
    type: ApplicationCommandType.ChatInput,


    run: async (client, interaction) => {

        let user = await UsersRPG.findOne({
            id: interaction.user.id
        });

        if (!user) {
            return interaction.reply({ content: ":x: Ops, você não está registrado no meu RPG.\n Para registrar digite /rpgstart e escolha a sua classe" })
        }

        const Lutar = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('lutar')
                    .setLabel('Lutar!')
                    .setStyle(3),
                new Discord.ButtonBuilder()
                    .setCustomId('fugir')
                    .setLabel('Fugir')
                    .setStyle(4)
            );

        const lutando = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('ataque')
                    .setLabel(`Ataque`)
                    .setStyle(2),
                new Discord.ButtonBuilder()
                    .setCustomId('skill1')
                    .setLabel(`${user.skill1}`)
                    .setStyle(1),
                new Discord.ButtonBuilder()
                    .setCustomId('skill2')
                    .setLabel(`${user.skill2}`)
                    .setStyle(1),
                new Discord.ButtonBuilder()
                    .setCustomId('skill3')
                    .setLabel(`${user.skill3}`)
                    .setStyle(1),
                new Discord.ButtonBuilder()
                    .setCustomId('ult')
                    .setLabel(`(ULT) ${user.ult}`)
                    .setStyle(1)
                    .setDisabled(true),
                    
            );

        
        //MONSTRO STATS

        let multiplicadorLevel = Math.floor(Math.random() * 10) + 1

        let monstroLevel = multiplicadorLevel
        let monstroHpMax = rawMonstros[0].stats.hp + (rawMonstros[0].stats.hpPL * multiplicadorLevel)
        let monstroHpAtual = rawMonstros[0].stats.hp + (rawMonstros[0].stats.hpPL * multiplicadorLevel)
        let monstroArmor = rawMonstros[0].stats.armor + (rawMonstros[0].stats.armorPL * multiplicadorLevel)
        let monstroDano = rawMonstros[0].stats.dano + (rawMonstros[0].stats.danoPL * multiplicadorLevel)

        let monstroEncontrado = rawMonstros[0].name
        
        let hpMonstro100 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square:'
        let hpMonstro90 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::white_large_square:'
        let hpMonstro80 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square:'
        let hpMonstro70 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square:'
        let hpMonstro60 = ':red_square::red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpMonstro50 = ':red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpMonstro40 = ':red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpMonstro30 = ':red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpMonstro20 = ':red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpMonstro10 = ':red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpMonstro0 = ':white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'

                
        //PLAYER STATS

        let playerLevel = user.rpgLevel
        let playerHpAtual = user.hpatual
        let playerHpMax = user.hpmax
        let playerDano = user.dano
        let playerManaAtual = user.manaatual
        let playerManaMax = user.manamax
        let playerArmor = user.armor


        let hpPlayer = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square:'

        let turno = "Turno: **Você**"
        
        



        let termino = new Discord.EmbedBuilder()
            .setTitle(`Parabéns, você venceu um ${monstroEncontrado}.`)
            .setDescription(`Você ganhou a luta e recebeu: \`10\` EXP e \`20\` Moedas de prata.\nOs seus status atuais são: Vida: \`${playerHpAtual}\``)

        let monstro = new Discord.EmbedBuilder()
            .setTitle(`Você encontrou um ${monstroEncontrado} nivel ${monstroLevel}!`)
            .setDescription('Você encontrou um Goblin, deseja lutar?')
            .setThumbnail(rawMonstros[0].icon)
            .addFields(
                {
                    name: `${monstroEncontrado}`,
                    value: `<:lvl:1065418053170499698> **Nível:** \`${monstroLevel}\` \n<:hp:1065001128758100108> **Vida:** \`${monstroHpMax}\`\n<:armor:1065004216835387492> **Armadura:** \`${monstroArmor}\`\n<:dmg:1065003206968615084> **Dano:** \`${monstroDano}\``,
                    inline: true,
                }
            )

        

        
        let RPG = await RpgStats.findOne({
            id: interaction.user.id
        });

        

        if (!RPG) {
            await interaction.reply({ embeds: [monstro], content: `${interaction.user}`, components: [Lutar], fetchReply: true })
                .then(async (message) => {
                    const filtro = (i) => i.user.id === interaction.user.id;
                    const coletor = await message.createMessageComponentCollector({ filtro, time: 600000 });

                    coletor.on('collect', async (collected) => {
                        let valor = collected.customId
                        collected.deferUpdate()
                        
                        if (valor === 'lutar') {

                            await RpgStats.create({
                                id: interaction.user.id,
                                monstro: monstroEncontrado,
                                monstroIcone: rawMonstros[0].icon,
                                monstroLevel: monstroLevel,
                                monstroHpBar: hpMonstro100,
                                monstroTotalHP: monstroHpMax,
                                monstroHpAtual: monstroHpMax,
                                monstroArmor: monstroArmor,
                                monstroDano: monstroDano,
                                turno: true
                            })

                            console.log(await RpgStats.findOne({
                                id: interaction.user.id
                            }))
                            console.log(monstroHpAtual)


                            let aceito = new Discord.EmbedBuilder()
                            .setTitle(`Você aceitou a luta!`)
                            .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                            .setThumbnail(rawMonstros[0].icon)
                            .addFields(
                                {
                                    name: `${monstroEncontrado}`,
                                    value: `<:lvl:1065418053170499698> **Nível:** \`${monstroLevel}\` `,
                                    inline: false,
                                },
                                {
                                    name: `Vida ${monstroEncontrado}`,
                                    value: `**Vida:** \`${monstroHpAtual}/${monstroHpMax}\`\n${hpMonstro100}`,
                                    inline: true
                                },
                                {
                                
                                    name: 'Seus Status',
                                    value: `**Vida:** \`${playerHpAtual}/${playerHpMax}\`\n${hpPlayer}\n\`${playerManaAtual}/${playerManaMax}\``,
                                    inline: true                                
                                }
                            )
                            .setFooter({ text: turno})

                            await interaction.editReply({ embeds: [aceito], content: `${interaction.user}`, components: [lutando]})
                        }

                        else if (valor === 'ataque') {

                            if (monstroArmor >= 10 && monstroArmor < 19) {
                                monstroArmor = 0.10
                            }
                            if (monstroArmor >= 20 && monstroArmor < 29) {
                                monstroArmor = 0.20
                            }
                            if (monstroArmor >= 30 && monstroArmor < 39) {
                                monstroArmor = 0.30
                            }
                            if (monstroArmor <= 9 ) {
                                monstroArmor = 0.09
                            }
                    
                            let dmgCalc = playerDano * monstroArmor
                            let dmg = playerDano - dmgCalc
                            dmg = Math.round(dmg)

                            monstroHpAtual = monstroHpAtual - dmg
                            let vidaMonstro = hpMonstro100

                            p9 = monstroHpMax * 0.9
                            p8 = monstroHpMax * 0.8
                            p7 = monstroHpMax * 0.7
                            p6 = monstroHpMax * 0.6
                            p5 = monstroHpMax * 0.5
                            p4 = monstroHpMax * 0.4
                            p3 = monstroHpMax * 0.3
                            p2 = monstroHpMax * 0.2
                            p1 = monstroHpMax * 0.1




                            if (monstroHpAtual >= p9) {
                                vidaMonstro = hpMonstro90
                            }else if (monstroHpAtual >= p8 && monstroHpAtual < p9) {
                                vidaMonstro = hpMonstro80
                            }else if (monstroHpAtual >= p7 && monstroHpAtual < p8) {
                                vidaMonstro = hpMonstro70
                            }else if (monstroHpAtual >= p6 && monstroHpAtual < p7) {
                                vidaMonstro = hpMonstro60
                            }else if (monstroHpAtual >= p5 && monstroHpAtual < p6) {
                                vidaMonstro = hpMonstro50
                            }else if (monstroHpAtual >= p4 && monstroHpAtual < p5) {
                                vidaMonstro = hpMonstro40
                            }else if (monstroHpAtual >= p3 && monstroHpAtual < p4) {
                                vidaMonstro = hpMonstro30
                            }else if (monstroHpAtual >= p2 && monstroHpAtual < p3) {
                                vidaMonstro = hpMonstro20
                            }else if (monstroHpAtual >= p1 && monstroHpAtual < p2) {
                                vidaMonstro = hpMonstro10
                            }
                            if (monstroHpAtual <= 0) {
                                return await interaction.editReply({ embeds: [termino], content: `${interaction.user}`, components: []})
                            }

                            await RpgStats.findOneAndUpdate({
                                id: interaction.user.id
                            }, { $set: { "monstroHpBar": vidaMonstro, "montroHP": monstroHpAtual } } )

                            let aceito = new Discord.EmbedBuilder()
                            .setTitle(`Você atacou e causou **${dmg}** em **${monstroEncontrado}!`)
                            .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                            .setThumbnail(rawMonstros[0].icon)
                            .addFields(
                                {
                                    name: `${monstroEncontrado}`,
                                    value: `<:lvl:1065418053170499698> **Nível:** \`${monstroLevel}\` `,
                                    inline: false,
                                },
                                {
                                    name: `Vida ${monstroEncontrado}`,
                                    value: `**Vida:** \`${monstroHpAtual}/${monstroHpMax}\`\n${vidaMonstro}`,
                                    inline: true
                                },
                                {
                                
                                    name: 'Seus Status',
                                    value: `**Vida:** \`${playerHpAtual}/${playerHpMax}\`\n${hpPlayer}\n\`${playerManaAtual}/${playerManaMax}\``,
                                    inline: true                                
                                }
                            )
                            .setFooter({ text: turno})

                            await interaction.editReply({ embeds: [aceito], content: `${interaction.user}`, components: [lutando]})
                        }

                    })
                })
            } else {

                let already = new Discord.EmbedBuilder()
                    .setTitle(`Continuando batalha anterior contra ${RPG.monstro}`)
                    .setDescription(`Você está lutando contra um ${RPG.monstro} nivel ${RPG.monstroLevel} `)
                .setThumbnail(RPG.monstroIcone)
                .addFields(
                    {
                        name: `${RPG.monstro}`,
                        value: `<:lvl:1065418053170499698> **Nível:** \`${RPG.monstroLevel}\` `,
                        inline: false,
                    },
                    {
                        name: `Vida ${RPG.monstro}`,
                        value: `**Vida:** \`${RPG.monstroHpAtual}/${RPG.monstroTotalHP}\`\n${RPG.monstroHpBar}`,
                        inline: true
                    },
                    {
                    
                        name: 'Seus Status',
                        value: `**Vida:** \`${playerHpAtual}/${playerHpMax}\`\n${hpPlayer}\n\`${playerManaAtual}/${playerManaMax}\``,
                        inline: true                                
                    }
                )
                .setFooter({ text: RPG.turn})

                await interaction.reply({ embeds: [already], content: `${interaction.user}`, components: [lutando], fetchReply: true })
                .then(async (message) => {
                    const filtro = (i) => i.user.id === interaction.user.id;
                    const coletor = await message.createMessageComponentCollector({ filtro, time: 600000 });

                    coletor.on('collect', async (collected) => {
                        let valor = collected.customId
                        collected.deferUpdate()
                        
                        if (valor === 'ataque') {

                            if (monstroArmor >= 10 && monstroArmor < 19) {
                                monstroArmor = 0.10
                            }
                            if (monstroArmor >= 20 && monstroArmor < 29) {
                                monstroArmor = 0.20
                            }
                            if (monstroArmor >= 30 && monstroArmor < 39) {
                                monstroArmor = 0.30
                            }
                            if (monstroArmor <= 9 ) {
                                monstroArmor = 0.09
                            }
                    
                            let dmgCalc = playerDano * monstroArmor
                            let dmg = playerDano - dmgCalc
                            dmg = Math.round(dmg)

                            monstroHpAtual = monstroHpAtual - dmg
                            let vidaMonstro = hpMonstro100

                            p9 = monstroHpMax * 0.9
                            p8 = monstroHpMax * 0.8
                            p7 = monstroHpMax * 0.7
                            p6 = monstroHpMax * 0.6
                            p5 = monstroHpMax * 0.5
                            p4 = monstroHpMax * 0.4
                            p3 = monstroHpMax * 0.3
                            p2 = monstroHpMax * 0.2
                            p1 = monstroHpMax * 0.1




                            if (monstroHpAtual >= p9) {
                                vidaMonstro = hpMonstro90
                            }else if (monstroHpAtual >= p8 && monstroHpAtual < p9) {
                                vidaMonstro = hpMonstro80
                            }else if (monstroHpAtual >= p7 && monstroHpAtual < p8) {
                                vidaMonstro = hpMonstro70
                            }else if (monstroHpAtual >= p6 && monstroHpAtual < p7) {
                                vidaMonstro = hpMonstro60
                            }else if (monstroHpAtual >= p5 && monstroHpAtual < p6) {
                                vidaMonstro = hpMonstro50
                            }else if (monstroHpAtual >= p4 && monstroHpAtual < p5) {
                                vidaMonstro = hpMonstro40
                            }else if (monstroHpAtual >= p3 && monstroHpAtual < p4) {
                                vidaMonstro = hpMonstro30
                            }else if (monstroHpAtual >= p2 && monstroHpAtual < p3) {
                                vidaMonstro = hpMonstro20
                            }else if (monstroHpAtual >= p1 && monstroHpAtual < p2) {
                                vidaMonstro = hpMonstro10
                            }
                            if (monstroHpAtual <= 0) {
                                return await interaction.editReply({ embeds: [termino], content: `${interaction.user}`, components: []})
                            }

                            let aceito = new Discord.EmbedBuilder()
                            .setTitle(`Você atacou e causou **${dmg}** em **${monstroEncontrado}!`)
                            .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                            .setThumbnail(rawMonstros[0].icon)
                            .addFields(
                                {
                                    name: `${monstroEncontrado}`,
                                    value: `<:lvl:1065418053170499698> **Nível:** \`${monstroLevel}\` `,
                                    inline: false,
                                },
                                {
                                    name: `Vida ${monstroEncontrado}`,
                                    value: `**Vida:** \`${monstroHpAtual}/${monstroHpMax}\`\n${vidaMonstro}`,
                                    inline: true
                                },
                                {
                                
                                    name: 'Seus Status',
                                    value: `**Vida:** \`${playerHpAtual}/${playerHpMax}\`\n${hpPlayer}\n\`${playerManaAtual}/${playerManaMax}\``,
                                    inline: true                                
                                }
                            )
                            .setFooter({ text: turno})

                            await interaction.editReply({ embeds: [aceito], content: `${interaction.user}`, components: [lutando]})
                        }

                    })
                })

            }
        }
    }