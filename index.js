const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;
const DB_URI = process.env.DB_URI;

//! Database
mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

//! Middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

//! Routes
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
