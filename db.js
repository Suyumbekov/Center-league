const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const conn = mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

module.exports = conn;
