if (process.env.NODE_ENV != "production") require("dotenv").config();
const port = process.env.PORT || 9000;

const express = require("express");

const routes = require("./routes/v1");

const { db } = require("./config");

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({ app: "Onboarding Task", status: "running" });
});

app.use("/api/v1", routes);
app.use("/images", express.static("Uploads"));

(async () => {
  try {
    await db.instance.authenticate();
    console.log("Database Connected successfully.");
    await db.instance.sync({ force: true });
  } catch (error) {
    console.error(/* "Unable to connect to the database:",  */ error.message);
  }
})();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on : ${port}`);
});
/* server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(
      `Address localhost:${PORT} in use please retry when the port is available!`
    );
    server.close();
  }
}); */
