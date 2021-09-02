const Router = require("express").Router();
const uploadMiddleware = require("../../config").uploadMiddleware;

const profileController = require("../../controllers").profileController;

Router.post("/", profileController.createProfile);
Router.put("/", profileController.updateProfile);
Router.delete("/", profileController.deleteProfile);
Router.post("/pic", uploadMiddleware, profileController.updateProfilePicture);

module.exports = Router;
