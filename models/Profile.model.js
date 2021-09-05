const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../config");
//const User = require("./index").User;

const Profile = sequelizeInstance.define(
  "Profile",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avtar: {
      type: DataTypes.STRING,
      // allowNull defaults to true
      defaultValue: "dummyImage.jpg",
      allowNull: false,
    },
    avtarLink: {
      type: DataTypes.STRING,
      // allowNull defaults to true
      defaultValue: "/public/dummyImage.jpg",
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      // allowNull defaults to true
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      //defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
    },
  },
  {
    //freezeTableName: true,
    tableName: "Profiles",
    timestamps: false,
    /* createdAt: true,
    updatedAt: false, */
  }
);

Profile.associate = (models) => {
  Profile.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

module.exports.Profile = Profile;
