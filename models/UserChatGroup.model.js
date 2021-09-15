module.exports = (dbInstance, Sequelize, DataTypes) => {
  const UserChatGroup = dbInstance.define(
    "UserChatGroup",
    {},
    {
      tableName: "UserChatGroups",
      timestamps: false,
    }
  );
  UserChatGroup.removeAttribute("id");

  return UserChatGroup;
};
