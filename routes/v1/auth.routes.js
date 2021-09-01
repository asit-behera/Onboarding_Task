const Router = require("express").Router();

Router.post("/login", (req, res) => {
  res.status(200).json({ route: "login" });
});
Router.post("/register", (req, res) => {
  res.status(200).json({ route: "register" });
});

module.exports = Router;
