const mongoose = require("mongoose");



const usersRPG = new mongoose.Schema({
  id: { type: String, required: true },
  discordName: { type: String },
  classe: { type: String },
  status: { type: Boolean, default: false },
  vivo: { type: Boolean, default: true },


  buff: { type: String, default: "" },
  debuff: { type: String, default: "" },


  skill1: { type: String },
  skill2: { type: String },
  skill3: { type: String },

  skill1cd: { type: Number, default: 0 },
  skill2cd: { type: Number, default: 0 },
  skill3cd: { type: Number, default: 0 },

  ult: { type: String },
  ultStats: { type: Number, default: 0 },
  skillPoint: { type: Number, default: 0 },
  ultPoint: { type: Number, default: 0 },
  skills: { type: String },


  rpgLevel: { type: Number, default: 1 },
  rpgXP: { type: Number, default: 0 },
  rpgMaxXP: { type: Number },

  hpatual: { type: Number },
  hpmax: { type: Number, default: 0 },
  hpUp: { type: Number, default: 0 },

  dano: { type: Number, default: 0 },
  danoUp: { type: Number, default: 0 },

  manaatual: { type: Number, default: 0 },
  manamax: { type: Number, default: 0 },
  manaUp: { type: Number, default: 0 },

  armor: { type: Number, default: 0 },
  armorUp: { type: Number, default: 0 },



  arma1: { type: String, default: "" },
  arma2: { type: String, default: "" },
  


  mundo: { type: String, default: 'Inicial' },


  wallet: { type: Number, default: 500 }, 
  gold: { type: Number, default: 10 },
  rep: { type: Number, default: 0 },
  fishy: { type: Number, default: 0 },


  monstros: { type: Number, default: 0 },
  mortes: { type: Number, default: 0 },


  demons: { type: Number, default: 0 },
  demonsBoss: { type: Number, default: 0 },
  souls: { type: Number, default: 0 },



  fazendasP: { type: Boolean, default: true },
  fazendasM: { type: Boolean, default: false },
  fazendasG: { type: Boolean, default: false }, 

  lagosP: { type: Boolean, default: true },
  lagosM: { type: Boolean, default: false },
  lagosG: { type: Boolean, default: false },

  peixesP: {type: Number, default: 0},
  peixesM: {type: Number, default: 0},
  peixesG: {type: Number, default: 0},


  iscaF: { type: Number, default: 20 },
  iscaB: { type: Number, default: 0 },
  iscaA: { type: Number, default: 0 },
  iscaS: { type: Number, default: 0 },
});

module.exports = mongoose.model("UsersRPG", usersRPG);