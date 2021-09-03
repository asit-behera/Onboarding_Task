const userService = require("../services").userService;
const hashingUtil = require("../utils").hashingUtil;
const tokenUtil = require("../utils").tokenUtil;

const loginUser = async (userData) => {
  const data = await userService.findUserByEmail(userData.email);
  if (!data.error) {
    const isChecked = await hashingUtil.checkHash(
      userData.password,
      data.user.password
    );
    if (isChecked) {
      const { userId, email } = data.user;
      const token = tokenUtil.generateToken({ userId, email });
      return {
        statusCode: "200",
        body: { status: "Login successful.", token },
      };
    } else {
      return {
        statusCode: "401",
        body: { status: "Login Failed", message: "Email or Password is wrong" },
      };
    }
  } else {
    return {
      statusCode: "401",
      body: { status: "Login Failed", message: "Email or Password is wrong" },
    };
  }
};

module.exports = {
  loginUser,
};
