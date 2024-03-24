require("dotenv").config();
const mongoose = require("mongoose");
const subscriberModel = require("./models/subscribers");
const data = require("./data");

// Connect to DATABASE
// const DATABASE_URL =
//   process.env.MONGODB_URI || "mongodb://localhost/subscribers";
const DATABASE_URL =
  "mongodb+srv://dudehimanshu97:R88WbSxOwp5759en@youtubesubs.nqfjpvm.mongodb.net/?retryWrites=true&w=majority&appName=YoutubeSubs";

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
