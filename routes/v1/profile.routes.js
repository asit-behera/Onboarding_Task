const Router = require("express").Router();

const profileController = require("../../controllers").profileController;

Router.post("/", profileController.createProfile);
Router.put("/", profileController.updateProfile);
Router.delete("/", profileController.deleteProfile);

module.exports = Router;
