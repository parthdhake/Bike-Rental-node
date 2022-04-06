const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
const route = require("./routes/Route.js");
const cookieParser = require("cookie-parser");

const passport = require("passport");

require("dotenv").config();
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

// Middlewares

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(passport.initialize());

// Routes
app.use("/", route);

mongoose
  .connect("mongodb://localhost:27017/Bike-Rental", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    app.listen(PORT, function () {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
