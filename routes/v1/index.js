const Router = require("express").Router();
const authRoute = require("./auth.routes");
const profileRoute = require("./profile.routes");
const testRoute = require("./test.routes");

Router.use("/auth", authRoute);
Router.use("/profile", profileRoute);
Router.use("/test", testRoute);

module.exports = Router;
