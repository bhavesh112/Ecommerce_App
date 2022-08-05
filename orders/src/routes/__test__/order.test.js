const chai = require("./../../test/chai");
const { app } = require("./../../app");
const { expect } = require("chai");
const mongoose = require("mongoose");
const order = {
  totalAmount: 234,
  cartItems: [
    {
      productId: mongoose.Types.ObjectId(),
      name: "samsung",
      productPicture: [],
      quantity: 1,
      price: 4000,
    },
  ],
  shipping: {
    first_name: "Deepanshu",
    last_name: "sapra",
    address1: "vinay nagar",
    address2: "vinay nagar",
    city: "gwalior",
    zip: "474012",
    state: "mp",
    country: "india",
  },
};

it("requires user to be logged in to check orders", async () => {
  const res = await chai.request(app).post("/api/order/").send(order);
  expect(res.status).to.equal(401);
});

it("add order", async () => {
  const token = await createToken();
  const res = await chai
    .request(app)
    .post("/api/order/")
    .set("Authorization", token)
    .send(order);
  expect(res.status).to.equal(201);
});

it("requires user to be logged in to get order detail", async () => {
  const res = await chai.request(app).get("/api/order/");
  expect(res.status).to.equal(401);
});

it("gets order detail", async () => {
  const token = await createToken();
  const res = await chai
    .request(app)
    .get("/api/order/")
    .set("Authorization", token);
  expect(res.status).to.equal(200);
});
