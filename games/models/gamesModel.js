const db = require("../../data/dbconfig");

module.exports = {
  add,
  get,
  getById
};

async function add(game) {
  const [id] = await db("games").insert(game);

  return db("games")
    .where({ id })
    .first();
}

function get() {
  return db("games");
}

function getById(id) {
  return db("games").where({ id });
}
