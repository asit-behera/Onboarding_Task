module.exports = (dbInstance, Sequelize, DataTypes) => {
  const ChatGroup = dbInstance.define(
    "ChatGroup",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        // allowNull defaults to true
        allowNull: true,
      },
      chatGroupId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      ownerId: {
        type: DataTypes.UUID,
        /* defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          unique: true, */
      },
      groupType: {
        type: DataTypes.ENUM({
          values: ["PRIVATE", "PUBLIC"],
        }),
      },
    },
    {
      //freezeTableName: true,
      tableName: "ChatGroups",
      timestamps: false,
      /* createdAt: true,
              updatedAt: false, */
    }
  );
  ChatGroup.removeAttribute("id");

  return ChatGroup;
};
