const mongoose = require("mongoose");
const { app } = require("./app");
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth");
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Listening on port 3000!!!!!!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
