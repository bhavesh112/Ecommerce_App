const mongoose = require("mongoose");
const { app } = require("./app");
const start = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Listening on port 3001!");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
