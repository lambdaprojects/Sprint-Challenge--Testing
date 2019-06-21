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
  });
});
