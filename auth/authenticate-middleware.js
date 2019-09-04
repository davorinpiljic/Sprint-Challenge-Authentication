const jwt = require("jsonwebtoken");
const secrets = require("../database/secrets.js");
// const Users = require("../users/user-model.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, function(err, decoded) {
      if (err) {
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        req.user = {
          username: decoded.username,
          department: decoded.department
        };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
};
