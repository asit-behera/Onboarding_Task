module.exports = (dbInstance, Sequelize, DataTypes) => {
  const Profile = dbInstance.define(
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
        defaultValue: "dummyImage.png",
        allowNull: false,
      },
      avtarLink: {
        type: DataTypes.STRING,
        // allowNull defaults to true
        defaultValue:
          process.env.BASE_URL +
          process.env.UPLOAD_FOLDER_URL +
          "dummyImage.png",
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
        //unique: true,
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
  Profile.removeAttribute("id");

  return Profile;
};
