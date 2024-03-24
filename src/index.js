require("dotenv").config();
const express = require("express");
const app = require("./app.js");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

// Parse JSON bodies (as sent by API clients)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
//comment down or remove process.env.MONGODB_URI for local system and if want to join to atlas please add .env file withrespect to your data base
const DATABASE_URL =
  process.env.MONGODB_URI || "mongodb://localhost/subscribers";

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
