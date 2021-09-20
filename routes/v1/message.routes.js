const Router = require("express").Router();

const messageController = require("../../controllers").messageController;

Router.post("/", messageController.createMessage);
Router.get("/", messageController.getAllMessages);
// TODO: Implement ASAP
/*
 !  Router.put("/", messageController);
 ! Router.delete("/", messageController); 
*/

module.exports = Router;
