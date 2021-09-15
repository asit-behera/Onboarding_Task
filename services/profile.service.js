const { Profile } = require("../config").db;
const userService = require("./user.service");

/*
 * Create Profile dummy data
{
    "name": "Billu Barber",
    "avtar": "path",
    "bio": "enjoying sunsets",
}
 */

const createProfile = (userDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const profile = await Profile.create(userDetails);
      resolve(profile);
    } catch (err) {
      reject(err);
    }
  });
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
  return new Promise(async (resolve, reject) => {
    try {
      const updateQueries = userData.updateQueries;
      const affectedRows = await Profile.update(updateQueries, {
        where: {
          userId: userData.userId,
        },
      });
      resolve(affectedRows);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteProfile = async (userId) => {
  return new Promise(async (resolve, reject) => {
    Promise.all([
      userService.deleteUserById(userId),
      Profile.destroy({
        where: {
          userId,
        },
      }),
    ])
      .then(([result1, result2]) => {
        console.log(result1, result2);
        resolve(result1.message);
      })
      .catch((err) => reject(err));
    /* try {
      const result = await userService.deleteUserById(userId);
      resolve(result.message);
    } catch (err) {
      reject(err);
    } */
  });
};

const getProfileDetailsById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Profile.findOne({
        where: {
          userId,
        },
      });
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfileDetailsById,
};
