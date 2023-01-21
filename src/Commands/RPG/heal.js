const Discord = require("discord.js");
const mongoose = require('mongoose')
const {  ApplicationCommandType } = require("discord.js");
const UsersRPG = require("../../Schemas/UserRPG");



module.exports = {
    name: "heal",
    description: "Reviva",
    type: ApplicationCommandType.ChatInput,


    run: async (client, interaction) => {

        let user = await UsersRPG.findOne({
            id: interaction.user.id
        });

        await UsersRPG.findOneAndUpdate({
            id: interaction.user.id
        }, { $set: { "vivo": true, "hpatual": user.hpmax } })

        interaction.reply({ content: 'Você está VIVO!' })
    }
}