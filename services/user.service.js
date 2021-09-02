const { User } = require("../models");

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return { error: false, user };
  } catch (err) {
    return { error: true, errors: err.errors };
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user != null) {
      return { error: false, user };
    } else {
      return { error: true, errorBody: "Register to continue" };
    }
  } catch (err) {
    return { error: true, errors: err.errors };
  }
};

module.exports = { createUser, findUserByEmail };
