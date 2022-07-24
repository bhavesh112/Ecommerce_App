const app = require("express")();
const proxy = require("express-http-proxy");
const options = {
  proxyReqPathResolver: function (req) {
    return req.originalUrl;
  },
};

app.use("/api/users", proxy("http://localhost:3001", options));
app.use("/api/product", proxy("http://localhost:8000", options));
app.use("/api/page", proxy("http://localhost:8000", options));
app.use("/api/category", proxy("http://localhost:8000", options));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
