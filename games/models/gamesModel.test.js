const GamesModel = require("./gamesModel");
const db = require("../../data/dbconfig");

describe("TS2: GAMESMODEL.JS TEST SUITE", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });
  describe("TS2.1: TESTING ADD", () => {
    it("TC5: Add a game into database", async () => {
      const game = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };
      await GamesModel.add(game);
      const games = await db("games");
      expect(games).toHaveLength(1);
    });
    it("TC6: Should add multiple records", async () => {
      await GamesModel.add({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      await GamesModel.add({
        title: "Minesweeper",
        genre: "Computer",
        releaseYear: 1985
      });
      const games = await db("games");
      expect(games).toHaveLength(2);
    });
  });

  describe("TS2.2: TESTING GET", () => {
    it("TC7: Get all the records from games db", async () => {
      await GamesModel.add({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      const games = await GamesModel.get();
      expect(games[0].title).toBe("Pacman");
    });

    it("TC8: Positive - Test for retrieving multiple records", async () => {
      await GamesModel.add({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      await GamesModel.add({
        title: "Minesweeper",
        genre: "Computer",
        releaseYear: 1985
      });
      await GamesModel.add({
        title: "Tetris",
        genre: "Video",
        releaseYear: 1990
      });
      const games = await GamesModel.get();
      expect(games).toHaveLength(3);
    });
  });

  describe("TS2.3: TESTING GET BY ID", () => {
    it("TC19: Get the record from games db by id", async () => {
      const addGame = await GamesModel.add({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      const game = await GamesModel.getById(addGame.id);
      expect(game).toHaveLength(1);
    });
  });

  describe("TS2.4:: TESTING REMOVE", () => {
    it("TC22: Delete a single game", async () => {
      await GamesModel.add({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
      let games = await db("games")
        .where({ id: "1" })
        .first();
      await GamesModel.remove(games.id);
      games = await db("games");
      expect(games).toHaveLength(0);
    });
  });
});
