const { Profile } = require("../models");
const userService = require("./user.service");

/*
 * Create Profile dummy data
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MjYwNmY4Mi0zMTJlLTQ0NzAtYjlhNy05MTAyMzkyN2FkMWUiLCJlbWFpbCI6InRlc3RfMjQ2QHRlc3QuY29tIiwiaWF0IjoxNjMwNjU1OTIwfQ.p--s-QRqjwzUtPJiEK6f7AJOhClcZN3c_UNSGqk6v0I",
    "name": "Billu Barber",
    "avtar": "path",
    "bio": "enjoying sunsets",
    "userId": "52606f82-312e-4470-b9a7-91023927ad1e"
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
    console.log(err);
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
