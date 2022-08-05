const chai = require("./../../test/chai");
const { app } = require("./../../app");
const { expect } = require("chai");

const order = {
  totalAmount: 234,
  cartItems: [
    {
      productId: "507f191e810c19729de860ea",
      name: "samsung",
      productPicture: [],
      quantity: 1,
      price: 4000,
    },
  ],
  shipping: [
    {
      first_name: "Deepanshu",
      last_name: "sapra",
      address1: "vinay nagar",
      address2: "vinay nagar",
      city: "gwalior",
      zip: "474012",
      state: "mp",
      country: "india",
    },
  ],
};
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMmYxOGM1OThkMTZhZjEzYzJkYjRlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY1ODc3NDk5OX0.ndfarao0zXwnOKKzr-FpibHJveVapP_PaRuiCg1tAxU";
it("requires user to be logged in to check orders", async () => {
  const res = await chai.request(app).post("/api/order/").send(order);
  expect(res.status).to.equal(401);
});

it("add order", async () => {
  const res = await chai
    .request(app)
    .post("/api/order/")
    .set("Authorization", token)
    .send(order);
  expect(res.status).to.equal(200);
});

it("requires user to be logged in to get order detail", async () => {
  const res = await chai.request(app).get("/api/order/");
  expect(res.status).to.equal(401);
});

it("gets order detail", async () => {
  const res = await chai
    .request(app)
    .get("/api/order/")
    .set("Authorization", token);
  expect(res.status).to.equal(200);
});
