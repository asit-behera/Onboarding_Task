const userService = require("../services").userService;
/*

try {
    const date = new Date().getMilliseconds();
    //const email = "test" + "_" + date + "@test.com";
    const email = "test" + "_" + 0 + "@test.com";
    email.replace(/ /g, "");
    const user = await User.create({
      email: email,
      password: "test18",
    });
    response
      .status(200)
      .json({ app: "Onboarding Task", status: "running", user });
  } catch (err) {
    console.log(err);
    response.status(200).json({
      app: "Onboarding Task",
      status: "running",
      //error: err.errors[0].message,
      error: err.errors.length,
    });
  }

*/
const loginUser = async (userData) => {
  const data = await userService.findUserByEmail(userData.email);
  //console.log(data);
  if (!data.error)
    if (userData.password == data.user.password) {
      const { userId, email } = data.user;
      return {
        statusCode: "200",
        body: { status: "Login successful.", user: { userId, email } },
      };
    } else {
      return {
        statusCode: "401",
        body: { status: "Login Failed", message: "Email or Password is wrong" },
      };
    }
  else {
    return {
      statusCode: "401",
      body: { status: "Login Failed", message: "Email or Password is wrong" },
    };
  }
};

module.exports = {
  loginUser,
};
