const userService = require("../services").userService;

const hashingUtil = require("../utils").hashingUtil;
const tokenUtil = require("../utils").tokenUtil;

const login = async (req, res) => {
  if (req.body == "{}") {
    res.status(400).json({
      status: "Login failed",
      message: "Email or password cant be empty",
    });
  }
  //const data = await authService.loginUser(req.body);
  const userData = req.body;
  try {
    const data = await userService.findUserByEmail(userData.email);
    try {
      await hashingUtil.checkHash(userData.password, data.user.password);
      const { userId, email } = data.user;
      const token = tokenUtil.generateToken({ userId, email });
      res.status(200).json({ status: "Login successful.", token });
    } catch (error) {
      //console.log(error);
      res.status(401).json({
        status: "Login Failed",
        message: "Email or Password is wrong",
      });
    }
  } catch (error) {
    res
      .status(401)
      .json({ status: "Login Failed", message: "Email or Password is wrong" });
  }
};

const register = async (req, res) => {
  const userData = req.body;
  const data = await userService.createUser(userData);
  if (!data.error) {
    res.status(200).json({
      message: "User registered successfully.",
    });
  } else {
    console.log(data);
    const errorBody = [];
    data.errors.forEach((element) => {
      errorBody.push(element.message);
    });
    res.status(400).json({ status: "Failed.", error: errorBody });
  }
};
module.exports = { login, register };
