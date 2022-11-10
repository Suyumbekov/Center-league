const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footballTeamSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "",
  },
  players: {
    type: [String],
    required: true,
  },
  games: {
    type: Number,
    default: 0,
  },
  won: {
    type: Number,
    default: 0,
  },
  lost: {
    type: Number,
    default: 0,
  },
  draw: {
    type: Number,
    default: function () {
      return this.games - (this.lost + this.won);
    },
  },
  gf: {
    type: Number,
    default: 0,
  },
  ga: {
    type: Number,
    default: 0,
  },
  gd: {
    type: Number,
    default: function () {
      return this.gf - this.ga;
    },
  },
  points: {
    type: Number,
    default: function () {
      return this.won * 3;
    },
  },
});

module.exports = mongoose.model("FootballTeams", footballTeamSchema);
