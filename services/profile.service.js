const { Profile } = require("../models");
const userService = require("./user.service");

/*
 * Create Profile dummy data
{
    "name": "Billu Barber",
    "avtar": "path",
    "bio": "enjoying sunsets",
}
 */

const createProfile = async (userDetails) => {
  try {
    const profile = await Profile.create(userDetails);
    return {
      statusCode: "200",
      body: { status: "Profile Created successfully.", profile },
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: "400",
      body: { status: "Profile Already Exists." },
    };
  }
};

/* *
 * {
 *     "userId": "",
 *     "updateQueries": {
 *     "name": "Billu Barber",
 *     "avtar": "path",
 *     "bio": "enjoying sunsets",
 *     }
 * }
 */
const updateProfile = async (userData) => {
  try {
    const { name, bio } = userData.updateQueries;
    const affectedRows = await Profile.update(
      { name, bio },
      {
        where: {
          userId: userData.userId,
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

const deleteProfile = async (userId) => {
  const result = await userService.deleteUserById(userId);
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
      {
        avtar: fileName,
        avtarLink:
          process.env.BASE_URL + process.env.UPLOAD_FOLDER_URL + fileName,
      },
      {
        where: {
          userId,
        },
      }
    );
    const status =
      affectedRows > 0
        ? "Profile Picture Updated successfully."
        : "Unable to Updated";
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
