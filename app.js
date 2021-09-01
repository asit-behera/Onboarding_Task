if (process.env.NODE_ENV != "production") require("dotenv").config();
const port = process.env.PORT || 9000;

const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({ app: "Onboarding Task", status: "running" });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on : ${port}`);
});
