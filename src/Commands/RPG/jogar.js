const Discord = require("discord.js");
const mongoose = require('mongoose')
const { ApplicationCommandType } = require("discord.js");
const UsersGlobal = require('../../Schemas/UserGlobal')
const UsersRPG = require("../../Schemas/UserRPG");
const rawMonstros = require("../../RawsRPG/monstros.json")
const RpgStats = require("../../Schemas/RPGstats")
const rawHabilidades = require('../../RawsRPG/habilidades.json')


module.exports = {
    name: "jogar",
    description: "Participe do rpg usando esse comando.",
    type: ApplicationCommandType.ChatInput,


    run: async (client, interaction) => {

        let user = await UsersRPG.findOne({
            id: interaction.user.id
        });

        if (interaction.user.id === '291624093902700545') {
            return interaction.reply({ content: `Você está proibido de usar meus comandos. Lei N° 16.054 da Legislação Cibernética de Direitos da Sociedade` })
        }

        if (!user) {
            let unregistred = new Discord.EmbedBuilder()
                .setTitle(":x: Ops, você não está registrado no meu RPG!")
                .setColor('#19ff25')
                .setDescription(`Para registrar digite /rpgstart e escolha a sua classe.`)
            return interaction.reply({ embeds: [unregistred] })
        }

        if (user.vivo === false) {
            let Morto = new Discord.EmbedBuilder()
                .setTitle(":skull: Você está morto!")
                .setColor('#000000')
                .setDescription(`Você morreu para um [ x ] level [ x ] e não pode lutar agora, você deve estar vivo para jogar novamente!`)
            return interaction.reply({ embeds: [Morto] })
        }

        let monstroInfo = rawMonstros[Math.floor(Math.random() * rawMonstros.length)]

        //MONSTRO STATS

        let multiplicadorLevel = Math.floor(Math.random() * 10) + 1

        let monstroLevel = multiplicadorLevel
        let monstroHpMax = monstroInfo.stats.hp + (monstroInfo.stats.hpPL * multiplicadorLevel)
        let monstroHpAtual = monstroInfo.stats.hp + (monstroInfo.stats.hpPL * multiplicadorLevel)
        let monstroArmor = monstroInfo.stats.armor + (monstroInfo.stats.armorPL * multiplicadorLevel)
        let monstroDano = monstroInfo.stats.dano + (monstroInfo.stats.danoPL * multiplicadorLevel)

        let monstroEncontrado = monstroInfo.name

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
        let playerDano = user.dano
        let playerManaAtual = user.manaatual
        let playerManaMax = user.manamax
        let playerArmor = user.armor

        let hpPlayer100 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square:'
        let hpPlayer90 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::white_large_square:'
        let hpPlayer80 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square:'
        let hpPlayer70 = ':red_square::red_square::red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square:'
        let hpPlayer60 = ':red_square::red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpPlayer50 = ':red_square::red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpPlayer40 = ':red_square::red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpPlayer30 = ':red_square::red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpPlayer20 = ':red_square::red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpPlayer10 = ':red_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let hpPlayer0 = ':white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'

        let manaPlayer100 = ':blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square:'
        let manaPlayer90 = ':blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::white_large_square:'
        let manaPlayer80 = ':blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::white_large_square::white_large_square:'
        let manaPlayer70 = ':blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::white_large_square::white_large_square::white_large_square:'
        let manaPlayer60 = ':blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let manaPlayer50 = ':blue_square::blue_square::blue_square::blue_square::blue_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let manaPlayer40 = ':blue_square::blue_square::blue_square::blue_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let manaPlayer30 = ':blue_square::blue_square::blue_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let manaPlayer20 = ':blue_square::blue_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let manaPlayer10 = ':blue_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'
        let manaPlayer0 = ':white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:'

        let xp = Math.floor(Math.random() * 20) + 1
        let moeda = Math.floor(Math.random() * 20) + 1

        function atacar(
            monstroArmor,
            playerDmg,
            playerHp,
            monstroVidaAtual,
            monstroVidaMax
        ) {

            if (monstroArmor >= 10 && monstroArmor < 19) {
                monstroArmor = 0.10
            }
            if (monstroArmor >= 20 && monstroArmor < 29) {
                monstroArmor = 0.20
            }
            if (monstroArmor >= 30 && monstroArmor < 39) {
                monstroArmor = 0.30
            }
            if (monstroArmor >= 40 && monstroArmor < 49) {
                monstroArmor = 0.40
            }
            if (monstroArmor >= 50 && monstroArmor < 59) {
                monstroArmor = 0.50
            }
            if (monstroArmor >= 60 && monstroArmor < 69) {
                monstroArmor = 0.60
            }
            if (monstroArmor <= 9) {
                monstroArmor = 0.09
            }

            let dmgCalc = playerDmg * monstroArmor
            let dmg = playerDmg - dmgCalc
            dmg = Math.round(dmg)

            monstroVidaAtual = monstroVidaAtual - dmg
            let vidaMonstro = hpMonstro100

            p9 = monstroVidaMax * 0.9
            p8 = monstroVidaMax * 0.8
            p7 = monstroVidaMax * 0.7
            p6 = monstroVidaMax * 0.6
            p5 = monstroVidaMax * 0.5
            p4 = monstroVidaMax * 0.4
            p3 = monstroVidaMax * 0.3
            p2 = monstroVidaMax * 0.2
            p1 = monstroVidaMax * 0.1

            if (monstroVidaAtual >= p9) {
                vidaMonstro = hpMonstro90
            } else if (monstroVidaAtual >= p8 && monstroVidaAtual < p9) {
                vidaMonstro = hpMonstro80
            } else if (monstroVidaAtual >= p7 && monstroVidaAtual < p8) {
                vidaMonstro = hpMonstro70
            } else if (monstroVidaAtual >= p6 && monstroVidaAtual < p7) {
                vidaMonstro = hpMonstro60
            } else if (monstroVidaAtual >= p5 && monstroVidaAtual < p6) {
                vidaMonstro = hpMonstro50
            } else if (monstroVidaAtual >= p4 && monstroVidaAtual < p5) {
                vidaMonstro = hpMonstro40
            } else if (monstroVidaAtual >= p3 && monstroVidaAtual < p4) {
                vidaMonstro = hpMonstro30
            } else if (monstroVidaAtual >= p2 && monstroVidaAtual < p3) {
                vidaMonstro = hpMonstro20
            } else if (monstroVidaAtual >= p1 && monstroVidaAtual < p2) {
                vidaMonstro = hpMonstro10
            }

            if (playerHp >= p9) {
                vidaPlayer = hpPlayer90
            } else if (playerHp >= p8 && playerHp < p9) {
                vidaPlayer = hpPlayer80
            } else if (playerHp >= p7 && playerHp < p8) {
                vidaPlayer = hpPlayer70
            } else if (playerHp >= p6 && playerHp < p7) {
                vidaPlayer = hpPlayer60
            } else if (playerHp >= p5 && playerHp < p6) {
                vidaPlayer = hpPlayer50
            } else if (playerHp >= p4 && playerHp < p5) {
                vidaPlayer = hpPlayer40
            } else if (playerHp >= p3 && playerHp < p4) {
                vidaPlayer = hpPlayer30
            } else if (playerHp >= p2 && playerHp < p3) {
                vidaPlayer = hpPlayer20
            } else if (playerHp >= p1 && playerHp < p2) {
                vidaPlayer = hpPlayer10
            }

        }

        atacar(monstroArmor, playerDano, user.hpatual, monstroHpAtual, monstroHpMax)

        let derrota = new Discord.EmbedBuilder()
            .setTitle(`:skull: Você Morreu!`)
            .setColor('#ff0d0d')
            .setDescription(`Sua vida chegou a 0 e você morreu`)

        let monstro = new Discord.EmbedBuilder()
            .setTitle(`Você encontrou um ${monstroEncontrado} nivel ${monstroLevel}!`)
            .setColor('#1d90f5')
            .setDescription('Você encontrou um Goblin, deseja lutar?')
            .setThumbnail(monstroInfo.icon)
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
            await interaction.reply({ embeds: [monstro], content: `${interaction.user}`, components: [Lutar], fetchReply: true })
                .then(async (message) => {
                    const filter = (i) => i.user.id === interaction.user.id;
                    const coletor = await message.createMessageComponentCollector({ filter, time: 600000 });

                    coletor.on('collect', async (collected) => {
                        const valor = collected.customId
                        collected.deferUpdate()

                        if (valor === 'fugir') {
                            let Run = new Discord.EmbedBuilder()
                                .setTitle(`Você fugiu da luta!`)
                                .setColor('#ff0d0d')
                                .setDescription(`Você fugiu com sucesso! Você pode encontrar outro monstro para lutar digitando /jogar novamente`)
                                .setTimestamp()

                            return interaction.editReply({ embeds: [Run], components: [] })
                        }

                        else if (valor === 'lutar') {

                            let vidaPlayer = hpPlayer100

                            p9 = user.hpmax * 0.9
                            p8 = user.hpmax * 0.8
                            p7 = user.hpmax * 0.7
                            p6 = user.hpmax * 0.6
                            p5 = user.hpmax * 0.5
                            p4 = user.hpmax * 0.4
                            p3 = user.hpmax * 0.3
                            p2 = user.hpmax * 0.2
                            p1 = user.hpmax * 0.1

                            if (user.hpatual === user.hpmax) {
                                vidaPlayer = hpPlayer100
                            } else if (user.hpatual >= p9) {
                                vidaPlayer = hpPlayer90
                            } else if (user.hpatual >= p8 && user.hpatual < p9) {
                                vidaPlayer = hpPlayer80
                            } else if (user.hpatual >= p7 && user.hpatual < p8) {
                                vidaPlayer = hpPlayer70
                            } else if (user.hpatual >= p6 && user.hpatual < p7) {
                                vidaPlayer = hpPlayer60
                            } else if (user.hpatual >= p5 && user.hpatual < p6) {
                                vidaPlayer = hpPlayer50
                            } else if (user.hpatual >= p4 && user.hpatual < p5) {
                                vidaPlayer = hpPlayer40
                            } else if (user.hpatual >= p3 && user.hpatual < p4) {
                                vidaPlayer = hpPlayer30
                            } else if (user.hpatual >= p2 && user.hpatual < p3) {
                                vidaPlayer = hpPlayer20
                            } else if (user.hpatual >= p1 && user.hpatual < p2) {
                                vidaPlayer = hpPlayer10
                            } else if (user.hpatual <= 0) {
                                vidaPlayer = hpPlayer0
                            }

                            let manaPlayer = manaPlayer100

                            m9 = user.manamax * 0.9
                            m8 = user.manamax * 0.8
                            m7 = user.manamax * 0.7
                            m6 = user.manamax * 0.6
                            m5 = user.manamax * 0.5
                            m4 = user.manamax * 0.4
                            m3 = user.manamax * 0.3
                            m2 = user.manamax * 0.2
                            m1 = user.manamax * 0.1

                            if (user.manaatual === user.manamax) {
                                manaPlayer = manaPlayer100
                            } else if (user.manaatual >= m9) {
                                manaPlayer = manaPlayer90
                            } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                manaPlayer = manaPlayer80
                            } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                manaPlayer = manaPlayer70
                            } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                manaPlayer = manaPlayer60
                            } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                manaPlayer = manaPlayer50
                            } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                manaPlayer = manaPlayer40
                            } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                manaPlayer = manaPlayer30
                            } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                manaPlayer = manaPlayer20
                            } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                manaPlayer = manaPlayer10
                            } else if (user.manaatual <= 0) {
                                manaPlayer = manaPlayer0
                            }

                            const skills = rawHabilidades.find((skill) => user.skill1 === skill.skills.skill1.nome);

                            const lutando = new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.ButtonBuilder()
                                        .setCustomId('ataque')
                                        .setLabel(`Ataque`)
                                        .setStyle(2),
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`skill:${skills.skills.skill1.id}`)
                                        .setLabel(`${user.skill1}`)
                                        .setStyle(1),
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`skill:${skills.skills.skill2.id}`)
                                        .setLabel(`${user.skill2}`)
                                        .setStyle(1),
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`skill:${skills.skills.skill3.id}`)
                                        .setLabel(`${user.skill3}`)
                                        .setStyle(1),
                                    new Discord.ButtonBuilder()
                                        .setCustomId('ult')
                                        .setLabel(`(ULT) ${user.ult} ${user.ultStats}%`)
                                        .setStyle(1)
                                        .setDisabled(true),
                                );

                            let aceito = new Discord.EmbedBuilder()
                                .setTitle(`Você aceitou a luta!`)
                                .setColor('#19ff25')
                                .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                .setThumbnail(monstroInfo.icon)
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
                                        value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${vidaPlayer}\n**Mana**\`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer}`,
                                        inline: true
                                    }
                                )
                                .setFooter({ text: `Turno: ${interaction.user.username}` })

                            // await RpgStats.create({
                            //     id: interaction.user.id,
                            //     monstro: monstroEncontrado,
                            //     monstroFoto: rawMonstros[0].icon,
                            //     monstroLevel: monstroLevel,
                            //     monstroHpBar: hpMonstro100,
                            //     monstroTotalHP: monstroHpMax,
                            //     monstroHpSave: monstroHpMax,
                            //     monstroArmor: monstroArmor,
                            //     monstroDano: monstroDano,
                            //     turno: true
                            // })
                            // console.log(await RpgStats.findOne({
                            //     id: interaction.user.id
                            // }))
                            // console.log(monstroHpAtual)

                            await interaction.editReply({ embeds: [aceito], content: `${interaction.user}`, components: [lutando] })
                        }

                        else if (valor === 'ataque') {
                            const skills = rawHabilidades.find((skill) => user.skill1 === skill.skills.skill1.nome);

                            const lutando = new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.ButtonBuilder()
                                        .setCustomId('ataque')
                                        .setLabel(`Ataque`)
                                        .setStyle(2),
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`skill:${skills.skills.skill1.id}`)
                                        .setLabel(`${user.skill1}`)
                                        .setStyle(1),
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`skill:${skills.skills.skill2.id}`)
                                        .setLabel(`${user.skill2}`)
                                        .setStyle(1),
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`skill:${skills.skills.skill3.id}`)
                                        .setLabel(`${user.skill3}`)
                                        .setStyle(1),
                                    new Discord.ButtonBuilder()
                                        .setCustomId('ult')
                                        .setLabel(`(ULT) ${user.ult} ${user.ultStats}%`)
                                        .setStyle(1)
                                        .setDisabled(true),
                                );


                            if (monstroArmor >= 10 && monstroArmor < 19) {
                                monstroArmor = 0.10
                            }
                            if (monstroArmor >= 20 && monstroArmor < 29) {
                                monstroArmor = 0.20
                            }
                            if (monstroArmor >= 30 && monstroArmor < 39) {
                                monstroArmor = 0.30
                            }
                            if (monstroArmor >= 40 && monstroArmor < 49) {
                                monstroArmor = 0.40
                            }
                            if (monstroArmor >= 50 && monstroArmor < 59) {
                                monstroArmor = 0.50
                            }
                            if (monstroArmor >= 60 && monstroArmor < 69) {
                                monstroArmor = 0.60
                            }
                            if (monstroArmor <= 9) {
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
                            } else if (monstroHpAtual >= p8 && monstroHpAtual < p9) {
                                vidaMonstro = hpMonstro80
                            } else if (monstroHpAtual >= p7 && monstroHpAtual < p8) {
                                vidaMonstro = hpMonstro70
                            } else if (monstroHpAtual >= p6 && monstroHpAtual < p7) {
                                vidaMonstro = hpMonstro60
                            } else if (monstroHpAtual >= p5 && monstroHpAtual < p6) {
                                vidaMonstro = hpMonstro50
                            } else if (monstroHpAtual >= p4 && monstroHpAtual < p5) {
                                vidaMonstro = hpMonstro40
                            } else if (monstroHpAtual >= p3 && monstroHpAtual < p4) {
                                vidaMonstro = hpMonstro30
                            } else if (monstroHpAtual >= p2 && monstroHpAtual < p3) {
                                vidaMonstro = hpMonstro20
                            } else if (monstroHpAtual >= p1 && monstroHpAtual < p2) {
                                vidaMonstro = hpMonstro10
                            } else if (monstroHpAtual <= 0) {
                                vidaMonstro = hpMonstro0
                            }

                            // await RpgStats.findOneAndUpdate({
                            //     id: interaction.user.id
                            // }, { $set: { "monstroHpBar": vidaMonstro, "montroHP": monstroHpAtual } } )

                            // PLAYER ATACANDO

                            let manaPlayer1 = manaPlayer100

                            m9 = user.manamax * 0.9
                            m8 = user.manamax * 0.8
                            m7 = user.manamax * 0.7
                            m6 = user.manamax * 0.6
                            m5 = user.manamax * 0.5
                            m4 = user.manamax * 0.4
                            m3 = user.manamax * 0.3
                            m2 = user.manamax * 0.2
                            m1 = user.manamax * 0.1

                            if (user.manaatual === user.manamax) {
                                manaPlayer1 = manaPlayer100
                            } else if (user.manaatual >= m9) {
                                manaPlayer1 = manaPlayer90
                            } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                manaPlayer1 = manaPlayer80
                            } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                manaPlayer1 = manaPlayer70
                            } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                manaPlayer1 = manaPlayer60
                            } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                manaPlayer1 = manaPlayer50
                            } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                manaPlayer1 = manaPlayer40
                            } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                manaPlayer1 = manaPlayer30
                            } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                manaPlayer1 = manaPlayer20
                            } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                manaPlayer1 = manaPlayer10
                            } else if (user.manaatual <= 0) {
                                manaPlayer1 = manaPlayer0
                            }

                            let vidaPlayer2 = hpPlayer100

                            p9 = user.hpmax * 0.9
                            p8 = user.hpmax * 0.8
                            p7 = user.hpmax * 0.7
                            p6 = user.hpmax * 0.6
                            p5 = user.hpmax * 0.5
                            p4 = user.hpmax * 0.4
                            p3 = user.hpmax * 0.3
                            p2 = user.hpmax * 0.2
                            p1 = user.hpmax * 0.1

                            if (user.hpatual === user.hpmax) {
                                vidaPlayer = hpPlayer100
                            } else if (user.hpatual >= p9) {
                                vidaPlayer2 = hpPlayer90
                            } else if (user.hpatual >= p8 && user.hpatual < p9) {
                                vidaPlayer2 = hpPlayer80
                            } else if (user.hpatual >= p7 && user.hpatual < p8) {
                                vidaPlayer2 = hpPlayer70
                            } else if (user.hpatual >= p6 && user.hpatual < p7) {
                                vidaPlayer2 = hpPlayer60
                            } else if (user.hpatual >= p5 && user.hpatual < p6) {
                                vidaPlayer2 = hpPlayer50
                            } else if (user.hpatual >= p4 && user.hpatual < p5) {
                                vidaPlayer2 = hpPlayer40
                            } else if (user.hpatual >= p3 && user.hpatual < p4) {
                                vidaPlayer2 = hpPlayer30
                            } else if (user.hpatual >= p2 && user.hpatual < p3) {
                                vidaPlayer2 = hpPlayer20
                            } else if (user.hpatual >= p1 && user.hpatual < p2) {
                                vidaPlayer2 = hpPlayer10
                            } else if (user.hpatual <= 0) {
                                vidaPlayer2 = hpPlayer0
                            }




                            let atk1 = new Discord.EmbedBuilder()
                                .setTitle(`Você atacou e causou ${dmg} de dano em ${monstroEncontrado}!`)
                                .setColor('#19ff25')
                                .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                .setThumbnail(monstroInfo.icon)
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
                                        value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${vidaPlayer2}\n**Mana:** \`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer1}`,
                                        inline: true
                                    }
                                )
                                .setFooter({ text: `Turno: ${interaction.user.username}` })

                            if (monstroHpAtual <= 0) {

                                let termino = new Discord.EmbedBuilder()
                                    .setTitle(`Parabéns, você venceu um ${monstroEncontrado}.`)
                                    .setThumbnail(monstroInfo.icon)
                                    .setColor('#19ff25')
                                    .setDescription(`Você ganhou a luta e recebeu: \`${xp}\` EXP e \`${moeda}\` Moedas de prata.\nOs seus status atuais são:\n**Vida:** \`${user.hpatual}\`\n${vidaPlayer2}\n**Mana:** \`${user.manaatual}\`\n${manaPlayer1}`)

                                return interaction.editReply({ embeds: [atk1], content: `${interaction.user}`, components: [] }),
                                    setTimeout(() => { interaction.editReply({ embeds: [termino], content: `${interaction.user}`, components: [] }) }, 2000)
                            }

                            // INIMIGO ATACANDO


                            if (playerArmor >= 10 && playerArmor < 19) {
                                playerArmor = 0.10
                            }
                            if (playerArmor >= 20 && playerArmor < 29) {
                                playerArmor = 0.20
                            }
                            if (playerArmor >= 30 && playerArmor < 39) {
                                playerArmor = 0.30
                            }
                            if (playerArmor <= 9) {
                                playerArmor = 0.09
                            }

                            let dmgCalcPlayer = monstroDano * playerArmor
                            let dmgPlayer = monstroDano - dmgCalcPlayer
                            dmgPlayer = Math.round(dmgPlayer)

                            user.hpatual = user.hpatual - dmgPlayer


                            let manaPlayer2 = manaPlayer100

                            m9 = user.manamax * 0.9
                            m8 = user.manamax * 0.8
                            m7 = user.manamax * 0.7
                            m6 = user.manamax * 0.6
                            m5 = user.manamax * 0.5
                            m4 = user.manamax * 0.4
                            m3 = user.manamax * 0.3
                            m2 = user.manamax * 0.2
                            m1 = user.manamax * 0.1

                            if (user.manaatual === user.manamax) {
                                manaPlayer2 = manaPlayer100
                            } else if (user.manaatual >= m9) {
                                manaPlayer2 = manaPlayer90
                            } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                manaPlayer2 = manaPlayer80
                            } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                manaPlayer2 = manaPlayer70
                            } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                manaPlayer2 = manaPlayer60
                            } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                manaPlayer2 = manaPlayer50
                            } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                manaPlayer2 = manaPlayer40
                            } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                manaPlayer2 = manaPlayer30
                            } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                manaPlayer2 = manaPlayer20
                            } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                manaPlayer2 = manaPlayer10
                            } else if (user.manaatual <= 0) {
                                manaPlayer2 = manaPlayer0
                            }


                            let vidaPlayer3 = hpPlayer100

                            p9 = user.hpmax * 0.9
                            p8 = user.hpmax * 0.8
                            p7 = user.hpmax * 0.7
                            p6 = user.hpmax * 0.6
                            p5 = user.hpmax * 0.5
                            p4 = user.hpmax * 0.4
                            p3 = user.hpmax * 0.3
                            p2 = user.hpmax * 0.2
                            p1 = user.hpmax * 0.1

                            if (user.hpatual >= p9) {
                                vidaPlayer3 = hpPlayer90
                            } else if (user.hpatual >= p8 && user.hpatual < p9) {
                                vidaPlayer3 = hpPlayer80
                            } else if (user.hpatual >= p7 && user.hpatual < p8) {
                                vidaPlayer3 = hpPlayer70
                            } else if (user.hpatual >= p6 && user.hpatual < p7) {
                                vidaPlayer3 = hpPlayer60
                            } else if (user.hpatual >= p5 && user.hpatual < p6) {
                                vidaPlayer3 = hpPlayer50
                            } else if (user.hpatual >= p4 && user.hpatual < p5) {
                                vidaPlayer3 = hpPlayer40
                            } else if (user.hpatual >= p3 && user.hpatual < p4) {
                                vidaPlayer3 = hpPlayer30
                            } else if (user.hpatual >= p2 && user.hpatual < p3) {
                                vidaPlayer3 = hpPlayer20
                            } else if (user.hpatual >= p1 && user.hpatual < p2) {
                                vidaPlayer3 = hpPlayer10
                            } else if (user.hpatual <= 0) {
                                vidaPlayer3 = hpPlayer0
                            }

                            let def = new Discord.EmbedBuilder()
                                .setTitle(`${monstroEncontrado} te atacou e causou ${dmgPlayer} de dano!`)
                                .setColor('#ff0d0d')
                                .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                .setThumbnail(monstroInfo.icon)
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
                                        value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${vidaPlayer3}\n**Mana:** \`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer2}`,
                                        inline: true
                                    }
                                )
                                .setFooter({ text: `Turno: ${monstroEncontrado}` })

                            await interaction.editReply({ embeds: [atk1], content: `${interaction.user}`, components: [] })

                            setTimeout(() => { interaction.editReply({ embeds: [def], content: `${interaction.user}`, components: [] }) }, 2000)

                            if (user.hpatual <= 0) {
                                return await interaction.editReply({ embeds: [def], content: `${interaction.user}`, components: [] }),
                                    setTimeout(() => { interaction.editReply({ embeds: [derrota], content: `${interaction.user}`, components: [] }) }, 2000),
                                    await UsersRPG.findOneAndUpdate({
                                        id: interaction.user.id
                                    }, { $set: { "vivo": false } })

                            }


                            //Player Atacando 2

                            await UsersRPG.findOneAndUpdate({
                                id: interaction.user.id
                            }, { $set: { "hpatual": user.hpatual } })

                            let manaPlayer3 = manaPlayer100

                            m9 = user.manamax * 0.9
                            m8 = user.manamax * 0.8
                            m7 = user.manamax * 0.7
                            m6 = user.manamax * 0.6
                            m5 = user.manamax * 0.5
                            m4 = user.manamax * 0.4
                            m3 = user.manamax * 0.3
                            m2 = user.manamax * 0.2
                            m1 = user.manamax * 0.1

                            if (user.manaatual === user.manamax) {
                                manaPlayer3 = manaPlayer100
                            } else if (user.manaatual >= m9) {
                                manaPlayer3 = manaPlayer90
                            } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                manaPlayer3 = manaPlayer80
                            } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                manaPlayer3 = manaPlayer70
                            } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                manaPlayer3 = manaPlayer60
                            } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                manaPlayer3 = manaPlayer50
                            } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                manaPlayer3 = manaPlayer40
                            } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                manaPlayer3 = manaPlayer30
                            } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                manaPlayer3 = manaPlayer20
                            } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                manaPlayer3 = manaPlayer10
                            } else if (user.manaatual <= 0) {
                                manaPlayer3 = manaPlayer0
                            }

                            let player = await UsersRPG.findOne({
                                id: interaction.user.id
                            });

                            let atk2 = new Discord.EmbedBuilder()
                                .setTitle(`Sua vez, ataque novamente!`)
                                .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                .setColor('#19ff25')
                                .setThumbnail(monstroInfo.icon)
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
                                        value: `**Vida:** \`${player.hpatual}/${player.hpmax}\`\n${vidaPlayer3}\n\`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer3}`,
                                        inline: true
                                    }
                                )
                                .setFooter({ text: `Turno: ${interaction.user.username}` })



                            setTimeout(() => { interaction.editReply({ embeds: [atk2], content: `${interaction.user}`, components: [lutando] }) }, 4000)



                        }

                        if (collected.isButton() && collected.customId.startsWith('skill')) {
                            const valor = collected.customId.split(':');
                            const skills = rawHabilidades.find((rpgSkill) => valor[1] === rpgSkill.skills.skill1.id || valor[1] === rpgSkill.skills.skill2.id || valor[1] === rpgSkill.skills.skill3.id);


                            //SKILL 1 USADA

                            if (valor[1] === skills.skills.skill1.id) {

                                const skills = rawHabilidades.find((skill) => user.skill1 === skill.skills.skill1.nome);

                                const lutando = new Discord.ActionRowBuilder()
                                    .addComponents(
                                        new Discord.ButtonBuilder()
                                            .setCustomId('ataque')
                                            .setLabel(`Ataque`)
                                            .setStyle(2),
                                        new Discord.ButtonBuilder()
                                            .setCustomId(`skill:${skills.skills.skill1.id}`)
                                            .setLabel(`${user.skill1}`)
                                            .setStyle(1),
                                        new Discord.ButtonBuilder()
                                            .setCustomId(`skill:${skills.skills.skill2.id}`)
                                            .setLabel(`${user.skill2}`)
                                            .setStyle(1),
                                        new Discord.ButtonBuilder()
                                            .setCustomId(`skill:${skills.skills.skill3.id}`)
                                            .setLabel(`${user.skill3}`)
                                            .setStyle(1),
                                        new Discord.ButtonBuilder()
                                            .setCustomId('ult')
                                            .setLabel(`(ULT) ${user.ult} ${user.ultStats}%`)
                                            .setStyle(1)
                                            .setDisabled(true),
                                    );

                                const usedSkill = rawHabilidades.find((usedSkill) => valor[1] === usedSkill.skills.skill1.id);

                                if (monstroArmor >= 10 && monstroArmor < 19) {
                                    monstroArmor = 0.10
                                }
                                if (monstroArmor >= 20 && monstroArmor < 29) {
                                    monstroArmor = 0.20
                                }
                                if (monstroArmor >= 30 && monstroArmor < 39) {
                                    monstroArmor = 0.30
                                }
                                if (monstroArmor >= 40 && monstroArmor < 49) {
                                    monstroArmor = 0.40
                                }
                                if (monstroArmor >= 50 && monstroArmor < 59) {
                                    monstroArmor = 0.50
                                }
                                if (monstroArmor >= 60 && monstroArmor < 69) {
                                    monstroArmor = 0.60
                                }
                                if (monstroArmor <= 9) {
                                    monstroArmor = 0.09
                                }

                                let player1 = await UsersRPG.findOne({
                                    id: interaction.user.id
                                });

                                let skillDmg = usedSkill.skills.skill1.dano + playerDano
                                let dmgCalc = playerDano * monstroArmor
                                let dmg = skillDmg - dmgCalc
                                dmg = Math.round(dmg)

                                if (player1.manaatual < usedSkill.skills.skill1.cost) {
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
                                    } else if (monstroHpAtual >= p8 && monstroHpAtual < p9) {
                                        vidaMonstro = hpMonstro80
                                    } else if (monstroHpAtual >= p7 && monstroHpAtual < p8) {
                                        vidaMonstro = hpMonstro70
                                    } else if (monstroHpAtual >= p6 && monstroHpAtual < p7) {
                                        vidaMonstro = hpMonstro60
                                    } else if (monstroHpAtual >= p5 && monstroHpAtual < p6) {
                                        vidaMonstro = hpMonstro50
                                    } else if (monstroHpAtual >= p4 && monstroHpAtual < p5) {
                                        vidaMonstro = hpMonstro40
                                    } else if (monstroHpAtual >= p3 && monstroHpAtual < p4) {
                                        vidaMonstro = hpMonstro30
                                    } else if (monstroHpAtual >= p2 && monstroHpAtual < p3) {
                                        vidaMonstro = hpMonstro20
                                    } else if (monstroHpAtual >= p1 && monstroHpAtual < p2) {
                                        vidaMonstro = hpMonstro10
                                    } else if (monstroHpAtual <= 0) {
                                        vidaMonstro = hpMonstro0
                                    }
        
                                    // await RpgStats.findOneAndUpdate({
                                    //     id: interaction.user.id
                                    // }, { $set: { "monstroHpBar": vidaMonstro, "montroHP": monstroHpAtual } } )
        
                                    // PLAYER ATACANDO
        
                                    let manaPlayer1 = manaPlayer100
        
                                    m9 = user.manamax * 0.9
                                    m8 = user.manamax * 0.8
                                    m7 = user.manamax * 0.7
                                    m6 = user.manamax * 0.6
                                    m5 = user.manamax * 0.5
                                    m4 = user.manamax * 0.4
                                    m3 = user.manamax * 0.3
                                    m2 = user.manamax * 0.2
                                    m1 = user.manamax * 0.1
        
                                    if (user.manaatual === user.manamax) {
                                        manaPlayer1 = manaPlayer100
                                    } else if (user.manaatual >= m9) {
                                        manaPlayer1 = manaPlayer90
                                    } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                        manaPlayer1 = manaPlayer80
                                    } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                        manaPlayer1 = manaPlayer70
                                    } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                        manaPlayer1 = manaPlayer60
                                    } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                        manaPlayer1 = manaPlayer50
                                    } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                        manaPlayer1 = manaPlayer40
                                    } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                        manaPlayer1 = manaPlayer30
                                    } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                        manaPlayer1 = manaPlayer20
                                    } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                        manaPlayer1 = manaPlayer10
                                    } else if (user.manaatual <= 0) {
                                        manaPlayer1 = manaPlayer0
                                    }
        
                                    let vidaPlayer2 = hpPlayer100
        
                                    p9 = user.hpmax * 0.9
                                    p8 = user.hpmax * 0.8
                                    p7 = user.hpmax * 0.7
                                    p6 = user.hpmax * 0.6
                                    p5 = user.hpmax * 0.5
                                    p4 = user.hpmax * 0.4
                                    p3 = user.hpmax * 0.3
                                    p2 = user.hpmax * 0.2
                                    p1 = user.hpmax * 0.1
        
                                    if (user.hpatual === user.hpmax) {
                                        vidaPlayer = hpPlayer100
                                    } else if (user.hpatual >= p9) {
                                        vidaPlayer2 = hpPlayer90
                                    } else if (user.hpatual >= p8 && user.hpatual < p9) {
                                        vidaPlayer2 = hpPlayer80
                                    } else if (user.hpatual >= p7 && user.hpatual < p8) {
                                        vidaPlayer2 = hpPlayer70
                                    } else if (user.hpatual >= p6 && user.hpatual < p7) {
                                        vidaPlayer2 = hpPlayer60
                                    } else if (user.hpatual >= p5 && user.hpatual < p6) {
                                        vidaPlayer2 = hpPlayer50
                                    } else if (user.hpatual >= p4 && user.hpatual < p5) {
                                        vidaPlayer2 = hpPlayer40
                                    } else if (user.hpatual >= p3 && user.hpatual < p4) {
                                        vidaPlayer2 = hpPlayer30
                                    } else if (user.hpatual >= p2 && user.hpatual < p3) {
                                        vidaPlayer2 = hpPlayer20
                                    } else if (user.hpatual >= p1 && user.hpatual < p2) {
                                        vidaPlayer2 = hpPlayer10
                                    } else if (user.hpatual <= 0) {
                                        vidaPlayer2 = hpPlayer0
                                    }

                                    let atk1 = new Discord.EmbedBuilder()
                                        .setTitle(`Você atacou e causou ${dmg} de dano em ${monstroEncontrado}!`)
                                        .setColor('#19ff25')
                                        .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                        .setThumbnail(monstroInfo.icon)
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
                                                value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${vidaPlayer2}\n**Mana:** \`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer1}`,
                                                inline: true
                                            }
                                        )
                                        .setFooter({ text: `Turno: ${interaction.user.username}` })

                                    let manaIns = new Discord.EmbedBuilder()
                                        .setTitle('Mana insuficiente!')
                                        .setDescription('Você não tem mana suficiente para usar essa habilidade.')
                                        .setColor('#ff0d0d')

                                    return interaction.editReply({ embeds: [atk1], content: `${interaction.user}`, components: [lutando] }),
                                        interaction.channel.send({ embeds: [manaIns], ephemeral: true })
                                }

                                manaCost = player1.manaatual - usedSkill.skills.skill1.cost
                                console.log(player1)
                                console.log(manaCost)

                                await UsersRPG.findOneAndUpdate({
                                    id: interaction.user.id
                                }, { $set: { "manaatual": manaCost } })

                                

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
                                } else if (monstroHpAtual >= p8 && monstroHpAtual < p9) {
                                    vidaMonstro = hpMonstro80
                                } else if (monstroHpAtual >= p7 && monstroHpAtual < p8) {
                                    vidaMonstro = hpMonstro70
                                } else if (monstroHpAtual >= p6 && monstroHpAtual < p7) {
                                    vidaMonstro = hpMonstro60
                                } else if (monstroHpAtual >= p5 && monstroHpAtual < p6) {
                                    vidaMonstro = hpMonstro50
                                } else if (monstroHpAtual >= p4 && monstroHpAtual < p5) {
                                    vidaMonstro = hpMonstro40
                                } else if (monstroHpAtual >= p3 && monstroHpAtual < p4) {
                                    vidaMonstro = hpMonstro30
                                } else if (monstroHpAtual >= p2 && monstroHpAtual < p3) {
                                    vidaMonstro = hpMonstro20
                                } else if (monstroHpAtual >= p1 && monstroHpAtual < p2) {
                                    vidaMonstro = hpMonstro10
                                } else if (monstroHpAtual <= 0) {
                                    vidaMonstro = hpMonstro0
                                }

                                // await RpgStats.findOneAndUpdate({
                                //     id: interaction.user.id
                                // }, { $set: { "monstroHpBar": vidaMonstro, "montroHP": monstroHpAtual } } )

                                // PLAYER ATACANDO

                                let manaPlayer1 = manaPlayer100

                                m9 = user.manamax * 0.9
                                m8 = user.manamax * 0.8
                                m7 = user.manamax * 0.7
                                m6 = user.manamax * 0.6
                                m5 = user.manamax * 0.5
                                m4 = user.manamax * 0.4
                                m3 = user.manamax * 0.3
                                m2 = user.manamax * 0.2
                                m1 = user.manamax * 0.1

                                if (user.manaatual === user.manamax) {
                                    manaPlayer1 = manaPlayer100
                                } else if (user.manaatual >= m9) {
                                    manaPlayer1 = manaPlayer90
                                } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                    manaPlayer1 = manaPlayer80
                                } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                    manaPlayer1 = manaPlayer70
                                } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                    manaPlayer1 = manaPlayer60
                                } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                    manaPlayer1 = manaPlayer50
                                } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                    manaPlayer1 = manaPlayer40
                                } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                    manaPlayer1 = manaPlayer30
                                } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                    manaPlayer1 = manaPlayer20
                                } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                    manaPlayer1 = manaPlayer10
                                } else if (user.manaatual <= 0) {
                                    manaPlayer1 = manaPlayer0
                                }

                                let vidaPlayer2 = hpPlayer100

                                p9 = user.hpmax * 0.9
                                p8 = user.hpmax * 0.8
                                p7 = user.hpmax * 0.7
                                p6 = user.hpmax * 0.6
                                p5 = user.hpmax * 0.5
                                p4 = user.hpmax * 0.4
                                p3 = user.hpmax * 0.3
                                p2 = user.hpmax * 0.2
                                p1 = user.hpmax * 0.1

                                if (user.hpatual === user.hpmax) {
                                    vidaPlayer = hpPlayer100
                                } else if (user.hpatual >= p9) {
                                    vidaPlayer2 = hpPlayer90
                                } else if (user.hpatual >= p8 && user.hpatual < p9) {
                                    vidaPlayer2 = hpPlayer80
                                } else if (user.hpatual >= p7 && user.hpatual < p8) {
                                    vidaPlayer2 = hpPlayer70
                                } else if (user.hpatual >= p6 && user.hpatual < p7) {
                                    vidaPlayer2 = hpPlayer60
                                } else if (user.hpatual >= p5 && user.hpatual < p6) {
                                    vidaPlayer2 = hpPlayer50
                                } else if (user.hpatual >= p4 && user.hpatual < p5) {
                                    vidaPlayer2 = hpPlayer40
                                } else if (user.hpatual >= p3 && user.hpatual < p4) {
                                    vidaPlayer2 = hpPlayer30
                                } else if (user.hpatual >= p2 && user.hpatual < p3) {
                                    vidaPlayer2 = hpPlayer20
                                } else if (user.hpatual >= p1 && user.hpatual < p2) {
                                    vidaPlayer2 = hpPlayer10
                                } else if (user.hpatual <= 0) {
                                    vidaPlayer2 = hpPlayer0
                                }

                                let embedSkill1 = new Discord.EmbedBuilder()
                                    .setTitle(`Você usou sua habilidade ${usedSkill.skills.skill1.nome} e causou ${dmg}!`)
                                    .setColor('#19ff25')
                                    .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                    .setThumbnail(monstroInfo.icon)
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
                                            value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${vidaPlayer2}\n\`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer1}`,
                                            inline: true
                                        }
                                    )
                                    .setFooter({ text: `Turno: ${interaction.user.username}` })

                                if (monstroHpAtual <= 0) {

                                    let termino = new Discord.EmbedBuilder()
                                        .setTitle(`Parabéns, você venceu um ${monstroEncontrado}.`)
                                        .setColor('#19ff25')
                                        .setDescription(`Você ganhou a luta e recebeu: \`${xp}\` EXP e \`${moeda}\` Moedas de prata.\nOs seus status atuais são:\n **Vida:** \`${user.hpatual}\``)

                                    return await interaction.editReply({ embeds: [embedSkill1], content: `${interaction.user}`, components: [] }),
                                        setTimeout(() => { interaction.editReply({ embeds: [termino], content: `${interaction.user}`, components: [] }) }, 2000)
                                }


                                // INIMIGO ATACANDO


                                if (playerArmor >= 10 && playerArmor < 19) {
                                    playerArmor = 0.10
                                }
                                if (playerArmor >= 20 && playerArmor < 29) {
                                    playerArmor = 0.20
                                }
                                if (playerArmor >= 30 && playerArmor < 39) {
                                    playerArmor = 0.30
                                }
                                if (playerArmor <= 9) {
                                    playerArmor = 0.09
                                }

                                let dmgCalcPlayer = monstroDano * playerArmor
                                let dmgPlayer = monstroDano - dmgCalcPlayer
                                dmgPlayer = Math.round(dmgPlayer)

                                user.hpatual = user.hpatual - dmgPlayer


                                let manaPlayer2 = manaPlayer100

                                m9 = user.manamax * 0.9
                                m8 = user.manamax * 0.8
                                m7 = user.manamax * 0.7
                                m6 = user.manamax * 0.6
                                m5 = user.manamax * 0.5
                                m4 = user.manamax * 0.4
                                m3 = user.manamax * 0.3
                                m2 = user.manamax * 0.2
                                m1 = user.manamax * 0.1

                                if (user.manaatual === user.manamax) {
                                    manaPlayer2 = manaPlayer100
                                } else if (user.manaatual >= m9) {
                                    manaPlayer2 = manaPlayer90
                                } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                    manaPlayer2 = manaPlayer80
                                } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                    manaPlayer2 = manaPlayer70
                                } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                    manaPlayer2 = manaPlayer60
                                } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                    manaPlayer2 = manaPlayer50
                                } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                    manaPlayer2 = manaPlayer40
                                } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                    manaPlayer2 = manaPlayer30
                                } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                    manaPlayer2 = manaPlayer20
                                } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                    manaPlayer2 = manaPlayer10
                                } else if (user.manaatual <= 0) {
                                    manaPlayer2 = manaPlayer0
                                }



                                let def = new Discord.EmbedBuilder()
                                    .setTitle(`${monstroEncontrado} te atacou e causou ${dmgPlayer} de dano!`)
                                    .setColor('#ff0d0d')
                                    .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                    .setThumbnail(monstroInfo.icon)
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
                                            value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${vidaPlayer2}\n**Mana:** \`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer2}`,
                                            inline: true
                                        }
                                    )
                                    .setFooter({ text: `Turno: ${monstroEncontrado}` })



                                if (monstroHpAtual <= 0) {

                                    let termino = new Discord.EmbedBuilder()
                                        .setTitle(`Parabéns, você venceu um ${monstroEncontrado}.`)
                                        .setColor('#19ff25')
                                        .setDescription(`Você ganhou a luta e recebeu: \`${xp}\` EXP e \`${moeda}\` Moedas de prata.\nOs seus status atuais são:\n **Vida:** \`${user.hpatual}\``)

                                    return await interaction.editReply({ embeds: [embedSkill1], content: `${interaction.user}`, components: [] }),
                                        setTimeout(() => { interaction.editReply({ embeds: [termino], content: `${interaction.user}`, components: [] }) }, 2000)
                                }

                                if (user.hpatual <= 0) {
                                    return await interaction.editReply({ embeds: [def], content: `${interaction.user}`, components: [] }),
                                        setTimeout(() => { interaction.editReply({ embeds: [derrota], content: `${interaction.user}`, components: [] }) }, 2000),
                                        await UsersRPG.findOneAndUpdate({
                                            id: interaction.user.id
                                        }, { $set: { "vivo": false } })

                                }

                                await interaction.editReply({ embeds: [embedSkill1], content: `${interaction.user}`, components: [] })

                                setTimeout(() => { interaction.editReply({ embeds: [def], content: `${interaction.user}`, components: [] }) }, 2000)

                                await UsersRPG.findOneAndUpdate({
                                    id: interaction.user.id
                                }, { $set: { "hpatual": user.hpatual } })

                                let player = await UsersRPG.findOne({
                                    id: interaction.user.id
                                });

                                let vidaPlayer3 = hpPlayer100

                                p9 = user.hpmax * 0.9
                                p8 = user.hpmax * 0.8
                                p7 = user.hpmax * 0.7
                                p6 = user.hpmax * 0.6
                                p5 = user.hpmax * 0.5
                                p4 = user.hpmax * 0.4
                                p3 = user.hpmax * 0.3
                                p2 = user.hpmax * 0.2
                                p1 = user.hpmax * 0.1

                                if (user.hpatual >= p9) {
                                    vidaPlayer3 = hpPlayer90
                                } else if (user.hpatual >= p8 && user.hpatual < p9) {
                                    vidaPlayer3 = hpPlayer80
                                } else if (user.hpatual >= p7 && user.hpatual < p8) {
                                    vidaPlayer3 = hpPlayer70
                                } else if (user.hpatual >= p6 && user.hpatual < p7) {
                                    vidaPlayer3 = hpPlayer60
                                } else if (user.hpatual >= p5 && user.hpatual < p6) {
                                    vidaPlayer3 = hpPlayer50
                                } else if (user.hpatual >= p4 && user.hpatual < p5) {
                                    vidaPlayer3 = hpPlayer40
                                } else if (user.hpatual >= p3 && user.hpatual < p4) {
                                    vidaPlayer3 = hpPlayer30
                                } else if (user.hpatual >= p2 && user.hpatual < p3) {
                                    vidaPlayer3 = hpPlayer20
                                } else if (user.hpatual >= p1 && user.hpatual < p2) {
                                    vidaPlayer3 = hpPlayer10
                                } else if (user.hpatual <= 0) {
                                    vidaPlayer3 = hpPlayer0
                                }

                                let manaPlayer3 = manaPlayer100

                                m9 = user.manamax * 0.9
                                m8 = user.manamax * 0.8
                                m7 = user.manamax * 0.7
                                m6 = user.manamax * 0.6
                                m5 = user.manamax * 0.5
                                m4 = user.manamax * 0.4
                                m3 = user.manamax * 0.3
                                m2 = user.manamax * 0.2
                                m1 = user.manamax * 0.1

                                if (user.manaatual === user.manamax) {
                                    manaPlayer3 = manaPlayer100
                                } else if (user.manaatual >= m9) {
                                    manaPlayer3 = manaPlayer90
                                } else if (user.manaatual >= m8 && user.manaatual < m9) {
                                    manaPlayer3 = manaPlayer80
                                } else if (user.manaatual >= m7 && user.manaatual < m8) {
                                    manaPlayer3 = manaPlayer70
                                } else if (user.manaatual >= m6 && user.manaatual < m7) {
                                    manaPlayer3 = manaPlayer60
                                } else if (user.manaatual >= m5 && user.manaatual < m6) {
                                    manaPlayer3 = manaPlayer50
                                } else if (user.manaatual >= m4 && user.manaatual < m5) {
                                    manaPlayer3 = manaPlayer40
                                } else if (user.manaatual >= m3 && user.manaatual < m4) {
                                    manaPlayer3 = manaPlayer30
                                } else if (user.manaatual >= m2 && user.manaatual < m3) {
                                    manaPlayer3 = manaPlayer20
                                } else if (user.manaatual >= m1 && user.manaatual < m2) {
                                    manaPlayer3 = manaPlayer10
                                } else if (user.manaatual <= 0) {
                                    manaPlayer3 = manaPlayer0
                                }

                                let atk2 = new Discord.EmbedBuilder()
                                    .setTitle(`Sua vez, ataque novamente!`)
                                    .setDescription(`Você está lutando contra um ${monstroEncontrado} nivel ${monstroLevel} `)
                                    .setColor('#19ff25')
                                    .setThumbnail(monstroInfo.icon)
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
                                            value: `**Vida:** \`${player.hpatual}/${player.hpmax}\`\n${vidaPlayer3}\n\`${playerManaAtual}/${playerManaMax}\`\n${manaPlayer3}`,
                                            inline: true
                                        }
                                    )
                                    .setFooter({ text: `Turno: ${interaction.user.username}` })

                                setTimeout(() => { interaction.editReply({ embeds: [atk2], content: `${interaction.user}`, components: [lutando] }) }, 4000)
                            }
                        }

                    })
                })
        } else {

            let already = new Discord.EmbedBuilder()
                .setTitle(`Continuando batalha anterior contra ${RPG.monstro}`)
                .setDescription(`Você está lutando contra um ${RPG.monstro} nivel ${RPG.monstroLevel} `)
                .setThumbnail(RPG.monstroFoto)
                .addFields(
                    {
                        name: `${RPG.monstro}`,
                        value: `<:lvl:1065418053170499698> **Nível:** \`${RPG.monstroLevel}\` `,
                        inline: false,
                    },
                    {
                        name: `Vida ${RPG.monstro}`,
                        value: `**Vida:** \`${RPG.monstroHpSave}/${RPG.monstroTotalHP}\`\n${RPG.monstroHpBar}`,
                        inline: true
                    },
                    {

                        name: 'Seus Status',
                        value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${hpPlayer}\n\`${playerManaAtual}/${playerManaMax}\``,
                        inline: true
                    }
                )
                .setFooter({ text: RPG.turno })

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
                            if (monstroArmor <= 9) {
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
                            } else if (monstroHpAtual >= p8 && monstroHpAtual < p9) {
                                vidaMonstro = hpMonstro80
                            } else if (monstroHpAtual >= p7 && monstroHpAtual < p8) {
                                vidaMonstro = hpMonstro70
                            } else if (monstroHpAtual >= p6 && monstroHpAtual < p7) {
                                vidaMonstro = hpMonstro60
                            } else if (monstroHpAtual >= p5 && monstroHpAtual < p6) {
                                vidaMonstro = hpMonstro50
                            } else if (monstroHpAtual >= p4 && monstroHpAtual < p5) {
                                vidaMonstro = hpMonstro40
                            } else if (monstroHpAtual >= p3 && monstroHpAtual < p4) {
                                vidaMonstro = hpMonstro30
                            } else if (monstroHpAtual >= p2 && monstroHpAtual < p3) {
                                vidaMonstro = hpMonstro20
                            } else if (monstroHpAtual >= p1 && monstroHpAtual < p2) {
                                vidaMonstro = hpMonstro10
                            }
                            if (monstroHpAtual <= 0) {
                                return await interaction.editReply({ embeds: [termino], content: `${interaction.user}`, components: [] })
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
                                        value: `**Vida:** \`${user.hpatual}/${user.hpmax}\`\n${hpPlayer}\n\`${playerManaAtual}/${playerManaMax}\``,
                                        inline: true
                                    }
                                )
                                .setFooter({ text: turno })

                            await interaction.editReply({ embeds: [aceito], content: `${interaction.user}`, components: [lutando] })
                        }

                    })
                })

        }
    }
}