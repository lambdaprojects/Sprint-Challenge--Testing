const express = require("express");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "The api is up!" });
  //res.send("<h2>The api is up!</h2>");
});

module.exports = server;
