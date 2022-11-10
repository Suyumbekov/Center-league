const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footballMatchSchema = new Schema({
  team_1: {
    type: String,
    ref: "FootballTeams",
  },
  team_2: {
    type: String,
    ref: "FootballTeams",
  },
  goal_1: {
    type: Number,
    required: true,
  },
  goal_2: {
    type: Number,
    required: true,
  },
  finished: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("FootballMatches", footballMatchSchema);
