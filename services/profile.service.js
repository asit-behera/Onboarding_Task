const { Profile } = require("../models");
const userService = require("./user.service");

/*
 * {
 *     name: "Billu Barber",
 *     avtar: "path",
 *     bio: "enjoying sunsets",
 *     userId: ""
 * }
 */

const createProfile = async (profileData) => {
  try {
    const { name, bio, userId } = profileData;
    const profile = await Profile.create({ name, bio, userId });
    return {
      statusCode: "200",
      body: { status: "Profile Created successfully.", profile },
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: "400",
      body: { status: "Profile Already Exists." },
    };
  }
};

/*
 * {
 *     "userId": "",
 *     "updateQueries": {
 *     "name": "Billu Barber",
 *     "avtar": "path",
 *     "bio": "enjoying sunsets",
 *     }
 * }
 */
const updateProfile = async (profileData) => {
  try {
    const { name, bio } = profileData.updateQueries;
    const affectedRows = await Profile.update(
      { name, bio },
      {
        where: {
          userId: profileData.userId,
        },
      }
    );
    const status =
      affectedRows > 0 ? "Profile Updated successfully." : "Nothing to Updated";
    return {
      statusCode: "200",
      body: { status },
    };
  } catch (error) {
    return {
      statusCode: "400",
      body: { status: "Unable to Update Profile." },
    };
  }
};

const deleteProfile = async (profileData) => {
  const result = await userService.deleteUserById(profileData.userId);
  if (!result.error) {
    return {
      statusCode: "200",
      body: result.message,
    };
  } else {
    return {
      statusCode: "400",
      body: "Unable to Delete Account",
    };
  }
};

const updateAvtar = async (userId, fileName) => {
  try {
    const affectedRows = await Profile.update(
      { avtar: fileName, avtarLink: "/public/" + fileName },
      {
        where: {
          userId,
        },
      }
    );
    const status =
      affectedRows > 0 ? "Profile Updated successfully." : "Nothing to Updated";
    return {
      statusCode: "200",
      body: { status },
    };
  } catch (error) {
    return {
      statusCode: "400",
      body: { status: "Unable to Update Profile." },
    };
  }
};

module.exports = { createProfile, updateProfile, deleteProfile, updateAvtar };
