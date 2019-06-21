const express = require("express");
const router = express.Router();
const GamesModel = require("../models/gamesModel");

router.post("/", validateGame, async (req, res) => {
  try {
    const games = await GamesModel.add(req.body);
    res.status(201).json({ games });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error while inserting the record" });
  }
});

router.get("/", async (req, res) => {
  try {
    const games = await GamesModel.get();
    if (games.length > 0) {
      res.status(200).json({ games: games });
    } else {
      res.status(200).json({ games: [] });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error_message: `There was an error retrieving the games` });
  }
});

//This is a custom middleware to validate a game
// Following are the validations:
// 1. Validates the body on a request to create a new game
// 2. validate if request body is not missing else 400
// 3. validate if the request body has the name and description field
function validateGame(req, res, next) {
  if (req.body) {
    if (req.body.title && req.body.genre) {
      next();
    } else {
      res.status(422).json({
        ERROR_MESSAGE: "Missing required title field or genre field"
      });
    }
  } else {
    res.status(422).json({ ERROR_MESSAGE: "Missing game data." });
  }
}

async function validateGameId(req, res, next) {
  if (req.params.id) {
    if (req.params.id !== 0 && req.params.id !== null && req.params.id !== "") {
      const game = await GamesModel.get(req.params.id);

      if (game.length > 0) {
        req.game = game;
        next();
      } else {
        res.status(404).json({
          ERROR_MESSAGE: "No game available for this game id in the database."
        });
      }
    } else {
      res.status(422).json({
        ERROR_MESSAGE: "The game id provided is either null or empty."
      });
    }
  } else {
    res.status(422).json({ ERROR_MESSAGE: "There is no game id available." });
  }
}
module.exports = router;
