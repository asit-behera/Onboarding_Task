const Router = require("express").Router();

const imageUploadMiddleware =
  require("../../middlewares").imageUploadMiddleware;
const profileController = require("../../controllers").profileController;

Router.post("/", profileController.createProfile);
Router.put("/", profileController.updateProfile);
Router.delete("/", profileController.deleteProfile);
Router.post(
  "/pic",
  imageUploadMiddleware.single,
  profileController.updateProfilePicture
);

module.exports = Router;
