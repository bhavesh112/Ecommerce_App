const { app } = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(9000, () => {
      console.log("Listening on port 9000!!!!!!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
