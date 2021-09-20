const { messageService } = require("../services");

const createMessage = async (req, res) => {
  const messageData = {
    userId: req.user.userId,
    text: req.body.text,
    chatGroupId: req.body.chatGroupId,
  };
  try {
    const message = await messageService.createMessage(messageData);
    res.status(200).json({
      message,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ status: "--", error });
  }
};

const getAllMessages = async (req, res) => {
  const messageData = {
    userId: req.user.userId,
    chatGroupId: req.body.chatGroupId,
    page: req.body.page,
  };
  try {
    const messages = await messageService.getAllMessages(messageData);
    res.status(200).json({
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "--", error });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
};
