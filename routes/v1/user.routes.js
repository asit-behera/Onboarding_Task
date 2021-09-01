const Router = require("express").Router();

Router.post("/user", (req, res) => {
  res.status(200).json({ route: "User Add" });
});
Router.put("/user", (req, res) => {
  res.status(200).json({ route: "User Edit" });
});
Router.delete("/user", (req, res) => {
  res.status(200).json({ route: "User Delete" });
});

module.exports = Router;
