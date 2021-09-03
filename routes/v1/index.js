const Router = require("express").Router();
const authRoute = require("./auth.routes");
const profileRoute = require("./profile.routes");
const testRoute = require("./test.routes");
const authMiddleware = require("../../middlewares").authMiddleware;

Router.use("/auth", authRoute);
Router.use("/profile", authMiddleware.authorizeUser, profileRoute);
Router.use("/test", authMiddleware.authorizeUser, testRoute);

module.exports = Router;
