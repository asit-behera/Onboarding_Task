module.exports = (dbInstance, Sequelize, DataTypes) => {
  const User = dbInstance.define(
    "User",
    {
      // Model attributes are defined here
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        // allowNull defaults to true
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      activeStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      //freezeTableName: true,
      tableName: "Users",
      timestamps: true,
      /* createdAt: true,
          updatedAt: false, */
    }
  );
  return User;
};
