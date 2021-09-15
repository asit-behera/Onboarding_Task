//const { values } = require("sequelize/types/lib/operators");
const { User, Profile } = require("../../models");
const Router = require("express").Router();

Router.get("/insert", async (request, response) => {
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
    console.log(err);
    response.status(200).json({
      app: "Onboarding Task",
      status: "running",
      //error: err.errors[0].message,
      error: err,
    });
  }
});

Router.get("/allData", async (req, res) => {
  Promise.all([
    User.findAll({
      //include: [{ model: Profile }],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    }),
    Profile.findAll(),
  ])
    .then(([users, profiles]) => {
      const userList = [];
      users.map((user) => {
        userList.push(user.dataValues);
      });
      const tempProfile = [];
      profiles.map((profile) => {
        tempProfile.push(profile.dataValues);
      });
      profiles = tempProfile;
      for (let index = 0; index < userList.length; index++) {
        const element = userList[index];
        const profile = profiles.find((profile) => {
          return profile.userId == element.userId;
        });
        if (profile) {
          const { name, avtar, avtarLink, bio } = profile;
          userList[index].profileData = {
            name,
            avtar,
            avtarLink,
            bio,
          };
        } else userList[index].profileData = "";
      }
      //console.log(userList);
      res.status(200).json(userList);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
});

Router.get("/users", async (req, res) => {
  User.findAll({
    //include: [{ model: Profile }],
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
});

Router.get("/profiles", async (req, res) => {
  Profile.findAll({
    //include: [{ model: Profile }],
  })
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send();
    });
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
