const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("./database/secrets.js");
const authenticate = require("./auth/authenticate-middleware.js");
const authRouter = require("./auth/auth-router.js");
const jokesRouter = require("./jokes/jokes-router.js");
const request = require("supertest");
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use("/api/auth", authRouter);
// server.use("/api/jokes", authenticate, jokesRouter);

server.post("/api/auth/register", async (req, res) => {
  console.log("getting to /register endpoint");
  console.log(req.body);
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

server.post("/login", async (req, res) => {
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

const PORT = process.env.PORT || 1111;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
module.exports = server;
