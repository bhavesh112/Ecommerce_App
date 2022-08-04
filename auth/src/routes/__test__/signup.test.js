const request = require("supertest");
const { app } = require("./../../app");

it("returns a 201 on successful signup", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(201);
});

it(`returns a 400 with an invalid email`, async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "testsadasd",
      password: "password",
      name: "test",
    })
    .expect(400);
});
it(`returns a 400 with an invalid password`, async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      name: "test",
      email: "testsadasd",
      password: "p",
    })
    .expect(400);
});
it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "bhavesh",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});
it(`returns a token after successful signup`, async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      name: "bhavesh",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  return expect(response.body.token).toBeDefined();
});
