//basic Libery import
const express = require("express");
const router = require("./src/routes/api");

const app = new express();
const rateLimiter = require("express-rate-limiter");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");

const mongoose = require("mongoose");
const { default: rateLimit } = require("express-rate-limit");

//Cors open

app.use(cors());

//security implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: "20mb" }));

const limiter = rateLimit({ windowMS: 158 * 60 * 1000, max: 3000 });

app.use(limiter);

// Replace the body-parser configuration
app.use(express.urlencoded({ extended: false }));

//connet mongoose

let URL = "mongodb://localhost:27017/taskmanager";
let OPTION = { user: "", pass: "", autoIndex: true };

mongoose
  .connect(URL, OPTION)
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connect fail");
  });

//route implement
app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({ data: "not found" });
});

module.exports = app;
