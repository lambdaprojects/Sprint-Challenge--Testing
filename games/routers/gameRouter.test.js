const req = require("supertest");
const GamesRouter = require("./gameRouter");
const server = require("../../api/server");
const db = require("../../data/dbconfig");

describe("TS3: TESTING GAMEROUTER.JS", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });
  describe("TS3.1: TESTING POST", () => {
    it("TC9: POST RES - 201 CREATED", async () => {
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
    it("TC10: POST RES - 422 ERROR NO GENRE", async () => {
      const addGame = {
        title: "Pacman",
        releaseYear: 1980
      };
      await req(server)
        .post("/games")
        .send(addGame)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422);
    });

    it("TC11: POST RES - 422 ERROR NO TITLE", async () => {
      const addGame = {
        genre: "Pacman",
        releaseYear: 1980
      };
      await req(server)
        .post("/games")
        .send(addGame)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422);
    });

    it("TC12: POST RES - 422 ERROR NO DATA AVAILABLE TO ADD", async () => {
      await req(server)
        .post("/games")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422);
    });
  });
});
