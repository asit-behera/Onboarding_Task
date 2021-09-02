const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../config");
//const Profile = require("./index").Profile;

const User = sequelizeInstance.define(
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

User.associate = (models) => {
  User.User.hasOne(models.Profile, {
    foreignKey: "userId",
    onDelete: "cascade",
  });
};

module.exports.User = User;
