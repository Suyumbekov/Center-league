const express = require("express");
const Football = require("../models/FootballTeams");
const Match = require("../models/FootballMatch");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Football.aggregate([
      { $sort: { points: -1, gd: -1, gf: -1 } },
    ]);
    res.render("../views/main", { teams: teams });
  } catch (e) {
    console.error(e);
  }
});

router.get("/football/table", (req, res) => {
  res.redirect("/");
});

router.post("/football/team", async (req, res) => {
  try {
    let team = await new Football({
      title: req.body.title,
      img: req.body.img,
      players: req.body.players,
    });

    team.save().then(() => {
      res.status(201).json(team);
    });
  } catch (e) {
    console.error(e);
  }
});

router.get("/football/match", async (req, res) => {
  try {
    const matches = await Match.find({});
    res.render("../views/main", { matches: matches });
  } catch (e) {
    console.error(e);
  }
});

router.post("/football/match", async (req, res) => {
  try {
    if (req.body.goal_1 > req.body.goal_2) {
      let team = await Football.findOneAndUpdate(
        { _id: req.body.team_1 },
        {
          $inc: {
            gf: req.body.goal_1,
            ga: req.body.goal_2,
            win: 1,
            games: 1,
            points: 3,
          },
        }
      );

      let team2 = await Football.findOneAndUpdate(
        { title: req.body.team_2 },
        {
          $inc: { gf: req.body.goal_2, ga: req.body.goal_1, lost: 1, games: 1 },
        }
      );
    } else if (req.body.goal_1 < req.body.goal_2) {
      let team = await Football.findOneAndUpdate(
        { title: req.body.team_2 },
        {
          $inc: {
            gf: req.body.goal_2,
            ga: req.body.goal_1,
            win: 1,
            games: 1,
            points: 3,
          },
        }
      );

      let team2 = await Football.findOneAndUpdate(
        { title: req.body.team_1 },
        {
          $inc: { gf: req.body.goal_1, ga: req.body.goal_2, lost: 1, games: 1 },
        }
      );
    } else {
      let team = await Football.findOneAndUpdate(
        { title: req.body.team_1 },
        {
          $inc: {
            gf: req.body.goal_1,
            ga: req.body.goal_2,
            draw: 1,
            games: 1,
            points: 1,
          },
        }
      );

      let team2 = await Football.findOneAndUpdate(
        { title: req.body.team_2 },
        {
          $inc: {
            gf: req.body.goal_2,
            ga: req.body.goal_1,
            draw: 1,
            games: 1,
            points: 1,
          },
        }
      );
    }

    const match = await new Match({
      team_1: req.body.team_1,
      team_2: req.body.team_2,
      goal_1: req.body.goal_1,
      goal_2: req.body.goal_2,
      finished: req.body.finished,
    });

    match.save().then(async () => {
      res.status(201).json(match);
    });
  } catch (e) {
    console.error(e);
  }
});

router.get("/chess/table", (req, res) => {
  res.send("Hello, world!");
});

module.exports = router;
