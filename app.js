if (process.env.NODE_ENV != "production") require("dotenv").config();
const port = process.env.PORT || 9000;

const express = require("express");

const routes = require("./routes/v1");

const { sequelizeInstance } = require("./config");

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({ app: "Onboarding Task", status: "running" });
});

app.use("/api/v1", routes);
app.use("/public", express.static("Uploads"));

(async () => {
  try {
    await sequelizeInstance.authenticate();
    console.log("Database Connected successfully.");
    //await sequelizeInstance.sync(/* { force: true } */);
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
