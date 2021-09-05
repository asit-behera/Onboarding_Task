const { User } = require("../models");

const createUser = async (userData) => {
  try {
    const { avtar, avtarLink, name, bio } = await User.create(userData);
    return {
      error: false,
      user: {
        avtar,
        avtarLink,
        name,
        bio,
      },
    };
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

// Future assons
const changePassword = () => {};

const deleteUserById = async (userId) => {
  try {
    const user = await User.destroy({
      where: {
        userId,
      },
    });
    console.log(user);
    return {
      error: false,
      message: { status: "Account Deleted successfully." },
    };
  } catch (err) {
    return { error: true, errors: err.errors };
  }
};

module.exports = { createUser, findUserByEmail, deleteUserById };
