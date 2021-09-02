if (process.env.NODE_ENV != "production") require("dotenv").config();
const port = process.env.PORT || 9000;

const express = require("express");

const { sequelizeInstance } = require("./config");
const routes = require("./routes/v1");

const app = express();
app.use(express.json());

app.get("/", async (request, response) => {
  response.status(200).json({ app: "Onboarding Task", status: "running" });
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
