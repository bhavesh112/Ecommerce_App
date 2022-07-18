const express = require("express");
const mongoose = require("mongoose");

const app = express();
const connectDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/CustermerDb');
  mongoose.connection.once('open', () => {
    console.log('Connection Successful');
  }).on('error', () => {
    console.log('Connection Unsuccessful');
  });

  app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });

};
module.exports = connectDatabase;



