const knex = require("knex");
const config = require("../knexfile.js");

const dbEnv = process.env.DB_ENV || "testing";

//const dbEnv = process.env.DB_ENV || "development";

module.exports = knex(config[dbEnv]);
