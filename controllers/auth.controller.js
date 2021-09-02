const userService = require("../services").userService;
const authService = require("../services").authService;

const login = async (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    res.status(400).json({
      status: "Login failed",
      message: "Email or password cant be empty",
    });
  }
  const data = await authService.loginUser(req.body);
  res.status(data.statusCode).json(data.body);
};

const register = async (req, res) => {
  const data = await userService.createUser(req.body);
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
