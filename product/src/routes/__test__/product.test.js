const chai = require("./../../test/chai");
const { app } = require("./../../app");
const addProduct = async () => {
  const token = await createToken();
  const res = await chai
    .request(app)
    .post("/api/category/create")
    .send({ name: "Mobile" })
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(201);
  const category = await (await chai.request(app).get("/api/category/")).body;
  const category_id = category[0]._id;

  const res2 = await chai
    .request(app)
    .post("/api/product/create")
    .attach("productPicture", "./src/routes/__test__/test.jpg", "test.jpg")
    .field("name", "test")
    .field("description", "test")
    .field("price", 1234)
    .field("quantity", 1234)
    .field("category", category_id)
    .set("Authorization", `Bearer ${token}`);
  expect(res2.status).toBe(201);
  return category_id;
};
describe("Product And Category Route", (done) => {
  it("requires authorization to add product and category", async () => {
    const res = await chai
      .request(app)
      .post("/api/product/create")
      .attach("productPicture", "./src/routes/__test__/test.jpg", "test.jpg")
      .field("name", "test")
      .field("description", "test")
      .field("price", "test")
      .field("category", "test");
    const res2 = await chai
      .request(app)
      .post("/api/category/create")
      .field("name", "test");
    expect(res.status).toBe(401);
    expect(res2.status).toBe(401);
  });
  it("adds category and product to database", async () => {
    const token = await createToken();
    const res = await chai
      .request(app)
      .post("/api/category/create")
      .send({ name: "Mobile" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(201);
    const category = await (await chai.request(app).get("/api/category/")).body;
    const category_id = category[0]._id;
    const res2 = await chai
      .request(app)
      .post("/api/product/create")
      .attach("productPicture", "./src/routes/__test__/test.jpg", "test.jpg")
      .field("name", "test")
      .field("description", "test")
      .field("price", 1234)
      .field("quantity", 1234)
      .field("category", category_id)
      .set("Authorization", `Bearer ${token}`);
    expect(res2.status).toBe(201);
  });
});
