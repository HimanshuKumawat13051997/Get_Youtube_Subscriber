const mongoose = require("mongoose");
const subscriberModel = require("./models/subscribers");
const data = require("./data");
require("dotenv").config();

// Connect to DATABASE
//****************************** */
//comment down process.env.MONGODB_URI to connect to localhost and if want to connect to  Atlas DB then un-comment it and add .env file.
const DATABASE_URL =
  process.env.MONGODB_URI || "mongodb://localhost/subscribers";

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Database created..."));

const refreshAll = async () => {
  await subscriberModel.deleteMany({});
  // console.log(connection);
  await subscriberModel.insertMany(data);
  await mongoose.disconnect();
};

refreshAll();
