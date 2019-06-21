const express = require("express");
const router = express.Router();
const GamesModel = require("../models/gamesModel");

router.get("/", (req, res) => {
  console.log("Nothing here");
});
