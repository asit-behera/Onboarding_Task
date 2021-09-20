const { Message, op } = require("../config").db;

const createMessage = (messageData) => {
  const { userId, text, chatGroupId } = messageData;
  return new Promise(async (resolve, reject) => {
    try {
      const message = await Message.create({
        userId: userId,
        messageText: text,
        chatGroupId: chatGroupId,
      });
      resolve(message);
    } catch (err) {
      reject(err);
    }
  });
};

const getAllMessages = (messageData) => {
  const { userId, chatGroupId, page } = messageData;
  let limit = 10;
  let offset = 0 + (page - 1) * limit;
  return new Promise(async (resolve, reject) => {
    try {
      const messages = await Message.findAll({
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]],
        where: {
          chatGroupId: chatGroupId,
          /* messageText: { [op.ne]: null },
          messageImageLink: { [op.ne]: null },
          messageImageName: { [op.ne]: null },
          messagseLocation: { [op.ne]: null }, */
        },
      });
      resolve(messages);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { createMessage, getAllMessages };

/* "messageId": "0e0f13bd-23f0-46e9-8a96-55e5c80e20a8",
"chatGroupId": "a93c0c6e-6dbb-437b-ab89-1526e6d6a1b4",
"userId": "4c2c1951-ba5a-4490-a72b-d26d83bfa842",
"messageText": "Hello everyone!",
"messageImageLink": null,
"messageImageName": null,
"messageLocation": null,
"createdAt": "2021-09-20T10:24:20.000Z" */
