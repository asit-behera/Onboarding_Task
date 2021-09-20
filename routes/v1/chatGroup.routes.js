const Router = require("express").Router();

const chatGroupController = require("../../controllers").chatGroupController;

Router.post("/", chatGroupController.createChatGroup);
Router.post("/addfriend", chatGroupController.addFriend);

// TODO: Implement ASAP
// ! Router.put("/", chatGroupController);
// ! Router.delete("/", chatGroupController);

module.exports = Router;
