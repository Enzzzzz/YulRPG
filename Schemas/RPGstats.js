const mongoose = require("mongoose");



const RpgStats = new mongoose.Schema({
    id: { type: String, required: true },
    monstro: { type: String },
    monstroIcone: { Type: String },
    monstroLevel: { type: Number },
    monstroHpBar: { Type: String },
    monstroTotalHP: { type: Number },
    monstroHpAtual: { Type: Number },
    monstroArmor: { type: Number },
    monstroDano: { type: Number },
    turn: { Type: Boolean }
})

module.exports = mongoose.model("PlayingRPG", RpgStats);