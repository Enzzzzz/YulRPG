const mongoose = require("mongoose");



const RpgStats = new mongoose.Schema({
    id: { type: String, required: true },
    monstro: { type: String, default: "" },
    monstroFoto: { Type: String, default: "" },
    monstroLevel: { type: Number, default: 0 },
    monstroHpBar: { Type: String, default: "" },
    monstroTotalHP: { type: Number, default: 0 },
    monstroHpSave: { Type: Number, default: 0 },
    monstroArmor: { type: Number, default: 0 },
    monstroDano: { type: Number, default: 0 },
    turno: { Type: Boolean }
})

module.exports = mongoose.model("rpgsave", RpgStats);