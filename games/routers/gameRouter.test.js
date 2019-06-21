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

  describe("TS3.2: TESTING GET", () => {
    it("TC13: GET RES - EMPTY ARRAY - NO DATA AVAILABLE", async () => {
      await req(server)
        .get("/games")
        .then(res => {
          const text = JSON.parse(res.text);
          expect(text.games).toHaveLength(0);
        });
    });

    it("TC14: GET RES Status - 200 - With content", async () => {
      const addGame = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };
      await req(server)
        .post("/games")
        .send(addGame);
      await req(server)
        .get("/games")
        .expect(200);
    });

    it("TC14: GET RES Status - 200 - CHECK ROW LENGTH", async () => {
      let addGame = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };
      await req(server)
        .post("/games")
        .send(addGame);
      addGame = {
        title: "Minesweeper",
        genre: "Desktop",
        releaseYear: 1985
      };
      await req(server)
        .post("/games")
        .send(addGame);

      await req(server)
        .get("/games")
        .then(res => {
          const text = JSON.parse(res.text);
          expect(text.games).toHaveLength(2);
        });
    });
  });
});
