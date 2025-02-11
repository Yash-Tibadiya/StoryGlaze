const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

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

//! Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
