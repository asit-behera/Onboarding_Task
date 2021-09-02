const Router = require("express").Router();

Router.post("/", (req, res) => {
  res.status(200).json({ route: "User Add" });
});
Router.put("/", (req, res) => {
  res.status(200).json({ route: "User Edit" });
});
Router.delete("/", (req, res) => {
  res.status(200).json({ route: "User Delete" });
});

module.exports = Router;
