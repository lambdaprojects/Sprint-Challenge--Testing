const req = require("supertest");
const GamesRouter = require("./gameRouter");
const server = require("../../api/server");
const db = require("../../data/dbconfig");

describe("TS3: TESTING GAMEROUTER.JS", () => {
  describe("TS3.1: TESTING POST", () => {
    it("TS9: POST - SUCCESS - STATUS - 201", async () => {
      const addGame = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };
      await req(server)
        .post("/games")
        .send(addGame)
        .expect(201);
    });
  });
});
