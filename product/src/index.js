const { app } = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI + "/product");
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Listening on port 8000!!!!!!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
