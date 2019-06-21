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
module.exports = router;
