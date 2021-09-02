const { User, Profile } = require("../../models");
const Router = require("express").Router();

Router.get("/testInsert", async (request, response) => {
  try {
    const date = new Date().getMilliseconds();
    const email = "test" + "_" + date + "@test.com";
    //const email = "test" + "_" + 0 + "@test.com";
    email.replace(/ /g, "");
    const user = await User.create({
      email: email,
      password: "test18",
    });
    response
      .status(200)
      .json({ app: "Onboarding Task", status: "running", user });
  } catch (err) {
    //console.log(err);
    response.status(200).json({
      app: "Onboarding Task",
      status: "running",
      //error: err.errors[0].message,
      error: err.errors.length,
    });
  }
});

Router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      //include: [{ model: Profile }],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = Router;
/*
{
    "name": "Billu Barber",
    "avtar": "path",
    "bio": "cudling with cats",
    "userId": "1b3900ab-4c20-4430-b903-abb76cda7440"
} 
*/

/*
{
    "userId": "c887913-5774-440b-86f8-1fe98bdccc9a",
    "updateQueries": {
        "name": "Billu Rout"
    }
}
*/
