const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findBy
};

function add(user) {
  return db("users").insert(user);
}

function findBy(username) {
  return db("users").where(username);
}
