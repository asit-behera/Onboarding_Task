const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../config");
const hashingUtil = require("../utils").hashingUtil;

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

User.beforeCreate(async (user /* , options */) => {
  const hashedPassword = await hashingUtil.getHashed(user.password);
  user.password = hashedPassword;
});

User.associate = (models) => {
  User.hasOne(models.Profile, {
    foreignKey: "userId",
    onDelete: "cascade",
  });
};

module.exports.User = User;
