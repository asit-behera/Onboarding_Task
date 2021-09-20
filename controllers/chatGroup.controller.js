const { userService, chatGroupService } = require("../services");

const createChatGroup = async (req, res) => {
  const chatGroupData = {
    userId: req.user.userId,
    name: req.body.name,
    description: req.body.description,
    groupType: req.body.groupType,
  };
  try {
    const user = await userService.findUserByUserId(chatGroupData.userId);
    const group = await chatGroupService.createChatGroup(chatGroupData);
    group.addUser(user);
    res.status(200).json({
      group,
    });
  } catch (error) {
    //console.log(Object.keys(error.errors), error.errors["0"].message);
    //console.log(error.message);
    res
      .status(400)
      .json({ status: "failed", error: error.errors["0"].message });
  }
};

const addFriend = async (req, res) => {
  const chatGroupData = {
    userId: req.user.userId,
    email: req.body.email,
    name: req.body.name,
  };
  try {
    // TODO: (1) validate user exit or not
    // TODO: (2) validate user is already a group member
    const user = await (
      await userService.findUserByEmail(chatGroupData.email)
    ).user;
    const group = await chatGroupService.findChatGroupByName(
      chatGroupData.name
    );
    await group.addUser(user);
    if (await group.hasUser(user)) {
      res.status(200).json({
        status: "success",
        message: "Successfully added to the group",
      });
    } else {
      res
        .status(500)
        .json({ status: "failed", error: "Internal server error" });
    }
  } catch (error) {
    //console.log(Object.keys(error.errors), error.errors["0"].message);
    //console.log(error.message);
    res
      .status(400)
      .json({ status: "failed", error: error.errors["0"].message });
  }
};

module.exports = {
  createChatGroup,
  addFriend,
};
