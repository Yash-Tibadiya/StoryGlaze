const express = require("express");
const path = require("path");

const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

//! Middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//! Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
