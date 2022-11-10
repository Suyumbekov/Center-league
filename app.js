const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const conn = require("./db");
const router = require("./routes/route");
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(express.json());
app.use("/", router);

module.exports = app;
