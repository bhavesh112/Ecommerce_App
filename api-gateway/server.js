const app = require("express")();
const proxy = require("express-http-proxy");

app.use("/api/users", proxy("http://localhost:3000/api"));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
