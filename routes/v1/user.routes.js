const Router = require("express").Router();

const userController = require("../../controllers").userController;

Router.post("/", userController.addUser);
Router.put("/", userController.editUser);
Router.delete("/", userController.deleteUser);

module.exports = Router;
