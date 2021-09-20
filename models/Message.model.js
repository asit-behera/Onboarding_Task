module.exports = (dbInstance, Sequelize, DataTypes) => {
  const Message = dbInstance.define(
    "Message",
    {
      messageId: {
        // * This can be used to delete and update the message
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      chatGroupId: {
        type: DataTypes.UUID,
        //defaultValue: Sequelize.UUIDV4,
        //primaryKey: true,
        //unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      messageText: {
        type: DataTypes.STRING,
      },
      messageImageLink: {
        type: DataTypes.STRING,
      },
      messageImageName: {
        type: DataTypes.STRING,
      },
      messageLocation: {
        type: DataTypes.STRING,
      },
    },
    {
      //freezeTableName: true,
      tableName: "Messages",
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );
  //Message.removeAttribute("id");

  return Message;
};
