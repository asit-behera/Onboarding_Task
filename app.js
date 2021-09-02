if (process.env.NODE_ENV != "production") require("dotenv").config();
const port = process.env.PORT || 9000;

const express = require("express");

const routes = require("./routes/v1");

const { sequelizeInstance } = require("./config");
const { User } = require("./models");

const app = express();
app.use(express.json());

app.get("/", async (request, response) => {
  response.status(200).json({ app: "Onboarding Task", status: "running" });
});

app.get("/testInsert", async (request, response) => {
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

app.use("/api/v1", routes);

(async () => {
  try {
    await sequelizeInstance.authenticate();
    console.log("Database Connected successfully.");
    //await sequelize.sync(/* { alter: true } */);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on : ${port}`);
});
