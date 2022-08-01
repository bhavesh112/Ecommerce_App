const mongoose = require("mongoose");
const { app } = require("./app");
require("dotenv").config();

const start = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(3002, () => {
      console.log("Listening on port 3002!!!!!!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
