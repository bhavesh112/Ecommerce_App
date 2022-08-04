const chai = require("./../../test/chai");

const { app } = require("./../../app");

const mongoose = require("mongoose");

process.env.JWT_SECRET = "testsecret";

describe("Page Route", (done) => {
  it("adds banner to page", async () => {
    const token = await createToken();
    const res = await chai
      .request(app)
      .post("/api/page/add-banner")
      .attach("img", "./src/routes/__test__/test.jpg", "test.jpg")
      .field("name", "test")
      .field("navigateTo", "test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("requires authorization to add banner", async () => {
    const res = await chai
      .request(app)
      .post("/api/page/add-banner")
      .attach("img", "./src/routes/__test__/test.jpg", "test.jpg")
      .field("name", "test")
      .field("navigateTo", "test");

    expect(res.status).toBe(401);
  });

  it("gets all banners", async () => {
    const token = await createToken();
    await chai
      .request(app)
      .post("/api/page/add-banner")
      .attach("img", "./src/routes/__test__/test.jpg", "test.jpg")
      .field("name", "test")
      .field("navigateTo", "test")
      .set("Authorization", `Bearer ${token}`);
    const res = await chai.request(app).get("/api/page/get-banners");

    expect(res.status).toBe(200);
  });

  it("deletes banner", async () => {
    const token = await createToken();
    await chai
      .request(app)
      .post("/api/page/add-banner")
      .attach("img", "./src/routes/__test__/test.jpg", "test.jpg")
      .field("name", "test")
      .field("navigateTo", "test")
      .set("Authorization", `Bearer ${token}`);
    await chai
      .request(app)
      .post("/api/page/add-banner")
      .attach("img", "./src/routes/__test__/test.jpg", "test.jpg")
      .field("name", "test2")
      .field("navigateTo", "test")
      .set("Authorization", `Bearer ${token}`);

    const res2 = await chai.request(app).get("/api/page/get-banners");
    const { _id } = res2.body[0];
    const res3 = await chai
      .request(app)
      .delete(`/api/page/delete-banner/${_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res3.status).toBe(200);

    const res4 = await chai.request(app).get("/api/page/get-banners");

    expect(res4.body.length).toBe(1);
  });
});
