const Router = require("express").Router();
const authRoute = require("./auth.routes");
const profileRoute = require("./profile.routes");

Router.use("/auth", authRoute);
Router.use("/profile", profileRoute);

module.exports = Router;
