const express = require("express");
const path = require("path");
const app = express();
const subscriberModel = require("./models/subscribers");
const staticPath = path.join(__dirname, "../public");

// Your code goes here
app.get("/", express.static(staticPath));
// Below code is end point to get details of subscribers containing all information
app.get("/subscribers", async (req, res) => {
  try {
    // The `subscriberModel.find()` function returns a Promise that resolves to an array of all subscribers in the database.
    const subs = await subscriberModel.find();

    // The `res.status(200)` sets the HTTP status code to 200, indicating a successful request.
    // The `.json()` method sends a JSON response to the client, with the `subs` array as the body.
    res.status(200).json(subs);
    res.status(200).json(subs);
  } catch (error) {
    // If an error occurs during the request, an HTTP status code of 400 is returned with an error message.
    res.status(400).json({
      error: "You have Done a Bad Request Check the URL again",
    });
  }
});

// Below code is end point to get details of subscribers containing only information name and subscribedChannel
app.get("/subscribers/names", async (req, res) => {
  try {
    //query for getting data from subscriberModel  and returning only names in it
    const subs = await subscriberModel.find(
      {},
      { _id: 0, name: 1, subscribedChannel: 1 }
    );
    // response 200 for successful data retreving
    res.status(200).json(subs);
  } catch (error) {
    //gives error message if url is incorrect or any other issue comes up
    res.status(400).json({
      error: "You have Done a Bad Request Check the URL again",
    });
  }
});

// Below code is end point to get details of subscriber that has  provided specific id
app.get("/subscribers/:id", async (req, res) => {
  try {
    //below gets id from parameters passed in URL
    let id = req.params.id;
    //below  finds user by its ID and returns the result
    const subs = await subscriberModel.findById(id);
    //response 200 for successful data retreving
    res.status(200).json(subs);
  } catch (error) {
    //gives error message if url is incorrect or any other issue comes up
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
