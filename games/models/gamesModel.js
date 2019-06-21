const db = require("../../data/dbconfig");

module.exports = {
  add,
  get
};

async function add(game) {
  const [id] = await db("games").insert(game);

  return db("games")
    .where({ id })
    .first();
}

function get() {
  return null;
}
