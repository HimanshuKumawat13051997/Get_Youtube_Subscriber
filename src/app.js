const express = require("express");
const app = express();
const subscriberModel = require("./models/subscribers");
// Your code goes here
app.get("/subscribers", async (req, res) => {
  try {
    const subs = await subscriberModel.find();
    res.status(200).json(subs);
  } catch (error) {
    res.status(400).json({
      error: "You have Done a Bad Request Check the URL again",
    });
  }
});

app.get("/subscribers/names", async (req, res) => {
  try {
    const subs = await subscriberModel.find(
      {},
      { _id: 0, name: 1, subscribedChannel: 1 }
    );
    res.status(200).json(subs);
  } catch (error) {
    res.status(400).json({
      error: "You have Done a Bad Request Check the URL again",
    });
  }
});

app.get("/subscribers/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const subs = await subscriberModel.findById(id);
    res.status(200).json(subs);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
