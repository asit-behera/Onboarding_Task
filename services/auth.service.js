const { User } = require("../models");
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
