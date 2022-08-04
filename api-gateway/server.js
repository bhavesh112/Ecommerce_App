const app = require("express")();
const proxy = require("express-http-proxy");
const options = {
  proxyReqPathResolver: function (req) {
    return req.originalUrl;
  },
};

app.use("/api/users", proxy(process.env.AUTH, options));
app.use("/api/cart", proxy(process.env.CART, options));
app.use("/api/product", proxy(process.env.PRODUCT, options));
app.use("/api/page", proxy(process.env.PRODUCT, options));
app.use("/api/category", proxy(process.env.PRODUCT, options));
app.use("/api/order", proxy(process.env.ORDER, options));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
