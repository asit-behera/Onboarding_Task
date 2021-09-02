const Router = require("express").Router();
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");

Router.use("/auth", authRoute);
Router.use("/user", userRoute);

module.exports = Router;
