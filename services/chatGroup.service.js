const { ChatGroup } = require("../config").db;

const createChatGroup = (chatGroupData) => {
  const { name, description, userId, groupType } = chatGroupData;
  return new Promise(async (resolve, reject) => {
    try {
      const group = await ChatGroup.create({
        name: name,
        description: description,
        ownerId: userId,
        groupType: groupType,
      });
      resolve(group);
    } catch (err) {
      reject(err);
    }
  });
};

const findChatGroupByName = (chatGroupData) => {
  const { name } = chatGroupData;
  return new Promise(async (resolve, reject) => {
    try {
      const group = await ChatGroup.findOne({
        name: name,
      });
      resolve(group);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { createChatGroup, findChatGroupByName };
