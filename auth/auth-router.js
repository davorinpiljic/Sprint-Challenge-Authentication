const Users = require("./auth-model.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../database/secrets.js");

router.post("/register", async (req, res) => {
  console.log("getting to /register endpoint");
  console.log(req);
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;
  try {
    const users = await Users.add(newUser);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(401).json({ message: "You shall not register!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: "Logged in", token });
    } else {
      res.status(401).json({ message: "Log in failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
