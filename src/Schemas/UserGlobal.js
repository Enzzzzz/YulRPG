const mongoose = require("mongoose");



const userGlobal = new mongoose.Schema({
  id: { type: String, required: true },
  discordName: { type: String },
  nivelG: { type: Number, default: 1 }, 
  xpG: { type: Number, default: 0 },
  titulo: { type: String, default: '' }, 
  sobremin: { type: String, default: '' }, 
  banner: { type: String, default: '' },
  badge: { type: String, default: '' },
  xpNextLevel: { type: Number, default: 200 },
  msgNumberG: { type: Number, default: 0},
  cmdsRpg: { type: Number, default: 0 },
});

module.exports = mongoose.model("UsersGlobal", userGlobal);