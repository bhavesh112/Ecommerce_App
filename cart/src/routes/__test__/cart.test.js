const chai = require("./../../test/chai");
const { app } = require("./../../app");
const { expect } = require("chai");

const product = {
  name: "Iphone 13",
  quantity: 1,
  price: 100,
  productPicture: [],
  productId: "62deb56b1b12782192f66cd6",
};
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMmYxOGM1OThkMTZhZjEzYzJkYjRlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY1ODc3NDk5OX0.ndfarao0zXwnOKKzr-FpibHJveVapP_PaRuiCg1tAxU";
it("requires user to be logged in to add to cart", async () => {
  const res = await chai.request(app).post("/api/cart/addtocart").send(product);
  expect(res.status).to.equal(401);
});

it("adds product to cart", async () => {
  const res = await chai
    .request(app)
    .post("/api/cart/addtocart")
    .set("Authorization", token)
    .send(product);
  expect(res.status).to.equal(200);
});

it("requires user to be logged in to get cart", async () => {
  const res = await chai.request(app).get("/api/cart/getcartItems");
  expect(res.status).to.equal(401);
});

it("gets cart items", async () => {
  const res = await chai
    .request(app)
    .get("/api/cart/getcartItems")
    .set("Authorization", token);
  expect(res.status).to.equal(200);
});

it("requires user to be logged in to delete cart item", async () => {
  const res = await chai
    .request(app)
    .delete("/api/cart/remove/62deb56b1b12782192f66cd6");
  expect(res.status).to.equal(401);
});

it("deletes cart item", async () => {
  const res = await chai
    .request(app)
    .post("/api/cart/addtocart")
    .set("Authorization", token)
    .send(product);
  expect(res.status).to.equal(200);

  const res2 = await chai
    .request(app)
    .delete(`/api/cart/remove/${res.body.cart._id}`)
    .set("Authorization", token);

  expect(res2.status).to.equal(200);
});

it("increases quantity if same product is added to cart", async () => {
  const res = await chai
    .request(app)
    .post("/api/cart/addtocart")
    .set("Authorization", token)
    .send(product);
  expect(res.status).to.equal(200);

  const res2 = await chai
    .request(app)
    .post("/api/cart/addtocart")
    .set("Authorization", token)
    .send(product);
  expect(res2.status).to.equal(200);

  const res3 = await chai
    .request(app)
    .get("/api/cart/getcartItems")
    .set("Authorization", token);
  expect(res3.body.cart.cartItems[0].quantity).to.equal(2);
});
