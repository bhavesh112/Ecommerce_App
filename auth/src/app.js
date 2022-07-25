const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

app.use("/api/users", require("./routes/signup"));
app.use("/api/users", require("./routes/signin"));
app.use("/api/users", require("./routes/forgot-password"));
app.use("/api/users", require("./routes/change-password"));

module.exports = { app };
